import Matrix from "./geometry/Matrix.js";

enum Edge {
    NONE = 0,
    TOP = 1,
    LEFT = 2,
    BOTTOM = 4,
    RIGHT = 8,
};
export default class WebGLRenderer {
    private readonly vertexShaderSource = `#version 300 es 
layout(location = 0) in vec3 a_position;
/* layout(location = 1) in */ uniform int a_edge;
/* layout(location = 2) in */ uniform vec2 a_offset;
/* layout(location = 3) in */ uniform float a_scale;
uniform mat4 u_model;
const float u_resolution = 64.0f;
const int EDGE_MORPH_TOP = 1;
const int EDGE_MORPH_LEFT = 2;
const int EDGE_MORPH_BOTTOM = 4;
const int EDGE_MORPH_RIGHT = 8;

const float MORPH_REGION = 0.3f;
// Poor man's bitwise &
bool edgePresent(int edge) {
    int e = a_edge / edge;
    return 2 * (e / 2) != e;
}

// At the edges of tiles morph the vertices, if they are joining onto a higher layer
float calculateMorph(vec2 p) {
    float morphFactor = 0.0f;
    if(edgePresent(EDGE_MORPH_TOP) && p.y >= 1.0f - MORPH_REGION) {
        float m = 1.0f - clamp((1.0f - p.y) / MORPH_REGION, 0.0f, 1.0f);
        morphFactor = max(m, morphFactor);
    }
    if(edgePresent(EDGE_MORPH_LEFT) && p.x <= MORPH_REGION) {
        float m = 1.0f - clamp(p.x / MORPH_REGION, 0.0f, 1.0f);
        morphFactor = max(m, morphFactor);
    }
    if(edgePresent(EDGE_MORPH_BOTTOM) && p.y <= MORPH_REGION) {
        float m = 1.0f - clamp(p.y / MORPH_REGION, 0.0f, 1.0f);
        morphFactor = max(m, morphFactor);
    }
    if(edgePresent(EDGE_MORPH_RIGHT) && p.x >= 1.0f - MORPH_REGION) {
        float m = 1.0f - clamp((1.0f - p.x) / MORPH_REGION, 0.0f, 1.0f);
        morphFactor = max(m, morphFactor);
    }

    return morphFactor;
}

// 01 // morphs input vertex uv from high to low detailed mesh position
// 02 // - gridPos: normalized [0, 1] .xy grid position of the source vertex
// 03 // - vertex: vertex.xy components in the world space
// 04 // - morphK: morph value
// 05
// 06 const float2 g_gridDim = float2( 64, 64 );
// 07
// 08 float2 morphVertex( float2 gridPos, float2 vertex, float morphK )
// 09 {
// 10 float2 fracPart = frac( gridPos.xy * g_gridDim.xy * 0.5 ) * 2.0 / g_gridDim.xy;
// 11 return vertex.xy - fracPart * g_quadScale.xy * morphK;
// 12 }

vec2 calculateNoMorphNeighbour(vec2 position, float morphK) {
    vec2 fraction = fract(a_position.xz * u_resolution * 0.5f) * 2.0f / u_resolution;
    return position - fraction * morphK * a_scale;
}


void main() {
    vec2 origin = a_position.xy;
    // Morph between zoom layers
    float morphK = calculateMorph(origin);
    vec2 position = origin * a_scale + a_offset;
    position = calculateNoMorphNeighbour(position, morphK);
    gl_Position = u_model * vec4(position, 0.0f, 1.0f);
}
    `;
    private readonly fragmentShaderSource = `#version 300 es
precision highp float;

uniform float u_elapsed;

out vec4 color;


void main() {
    color = vec4(0.5f, 0.3f, 0.0f, 1.0f);
}

    `;
    private readonly context: WebGL2RenderingContext;
    private readonly program: WebGLProgram;
    private readonly vao: WebGLVertexArrayObject;
    private readonly buffer0: WebGLBuffer;
    private readonly buffer1: WebGLBuffer;
    private readonly buffer2: WebGLBuffer;
    private readonly buffer3: WebGLBuffer;
    private readonly scales: number[] = [];
    private readonly offsets: number[] = [];
    private readonly edges: number[] = [];
    private count: number = 0;
    private tiles: number = 0;
    private elapsed = 0;
    private delta = 0;
    private now = 0;
    private readonly loc_model: WebGLUniformLocation;
    private readonly loc_edge: WebGLUniformLocation;
    private readonly loc_scale: WebGLUniformLocation;
    private readonly loc_offset: WebGLUniformLocation;
    constructor() {
        if (typeof wx === "undefined") {
            const canvas = document.createElement("canvas");
            document.body.append(canvas);
            this.context = canvas.getContext("webgl2")!;
        } else {
            this.context = wx.createCanvas().getContext("webgl2") as WebGL2RenderingContext;
        }
        this.program = this.context.createProgram()!;
        this.initShaderProgram();
        this.initUniforms();
        this.vao = this.context.createVertexArray()!;
        this.buffer0 = this.context.createBuffer()!;
        this.buffer1 = this.context.createBuffer()!;
        this.buffer2 = this.context.createBuffer()!;
        this.buffer3 = this.context.createBuffer()!;
        this.loc_model = this.context.getUniformLocation(this.program, "u_model")!;
        this.loc_edge = this.context.getUniformLocation(this.program, "a_edge")!;
        this.loc_scale = this.context.getUniformLocation(this.program, "a_scale")!;
        this.loc_offset = this.context.getUniformLocation(this.program, "a_offset")!;
        this.initCDLODGrid();
        this.initDrawobject();
        requestAnimationFrame((time) => this.now = time);
    }

    createTile(x: number, y: number, scale: number, edge: Edge) {
        this.tiles++;
        this.scales.push(scale);
        this.offsets.push(x, y);
        this.edges.push(edge);

    }
    initCDLODGrid() {
        const TILE_LEVEL = 4;
        let initialScale = 1 / Math.pow(2, TILE_LEVEL);

        // Create center layer first
        //    +---+---+
        //    | O | O |
        //    +---+---+
        //    | O | O |
        //    +---+---+
        this.createTile(-initialScale, -initialScale, initialScale, Edge.NONE);
        this.createTile(-initialScale, 0, initialScale, Edge.NONE);
        this.createTile(0, 0, initialScale, Edge.NONE);
        this.createTile(0, -initialScale, initialScale, Edge.NONE);
        // Create "quadtree" of tiles, with smallest in center
        // Each added layer consists of the following tiles (marked 'A'), with the tiles
        // in the middle being created in previous layers
        // +---+---+---+---+
        // | A | A | A | A |
        // +---+---+---+---+
        // | A |   |   | A |
        // +---+---+---+---+
        // | A |   |   | A |
        // +---+---+---+---+
        // | A | A | A | A |
        // +---+---+---+---+
        for (let scale = initialScale; scale < 1; scale *= 2) {
            this.createTile(-2 * scale, -2 * scale, scale, Edge.BOTTOM | Edge.LEFT);

            this.createTile(-2 * scale, -scale, scale, Edge.LEFT);
            this.createTile(-2 * scale, 0, scale, Edge.LEFT);
            this.createTile(-2 * scale, scale, scale, Edge.TOP | Edge.LEFT);

            this.createTile(-scale, -2 * scale, scale, Edge.BOTTOM);

            // 2 tiles 'missing' here are in previous layer
            this.createTile(-scale, scale, scale, Edge.TOP);

            this.createTile(0, -2 * scale, scale, Edge.BOTTOM);
            // 2 tiles 'missing' here are in previous layer
            this.createTile(0, scale, scale, Edge.TOP);

            this.createTile(scale, -2 * scale, scale, Edge.BOTTOM | Edge.RIGHT);

            this.createTile(scale, -scale, scale, Edge.RIGHT);
            this.createTile(scale, 0, scale, Edge.RIGHT);
            this.createTile(scale, scale, scale, Edge.TOP | Edge.RIGHT);
        }
    }
    tick(time: number) {
        this.delta = time - this.now;
        this.elapsed += this.delta;
        this.now = time;

        this.render();
        requestAnimationFrame((time) => {
            this.tick(time);
        })
    }
    initUniforms() {
        this.context.useProgram(this.program);
    }
    initDrawobject() {
        const context = this.context;
        context.clearColor(0, 0, 0, 1);
        context.enable(context.DEPTH_TEST);
        context.enable(context.CULL_FACE);
        context.bindVertexArray(this.vao);
        {

            const attributeLocation = context.getAttribLocation(this.program, "a_position");
            if (attributeLocation === -1) {
                throw new Error("Failed to get attribute location");
            }
            const buffer = this.buffer0;
            if (buffer === null) {
                throw new Error("Failed to create buffer");
            }
            context.enableVertexAttribArray(attributeLocation);
            context.bindBuffer(context.ARRAY_BUFFER, buffer);
            const subdivided: number[] = [];
            const TILE_RESOLUTION = 64;
            for (let i = 0; i < TILE_RESOLUTION; i++) {
                for (let j = 0; j < TILE_RESOLUTION; j++) {
                    const x0 = i / TILE_RESOLUTION;
                    const x1 = (i + 1) / TILE_RESOLUTION;
                    const z0 = j / TILE_RESOLUTION;
                    const z1 = (j + 1) / TILE_RESOLUTION;
                    subdivided.push(
                        x0, z0, 0,
                        x1, z0, 0,
                        x1, z1, 0,
                        x1, z1, 0,
                        x0, z1, 0,
                        x0, z0, 0,
                    );
                }
            }
            context.bufferData(context.ARRAY_BUFFER, new Float32Array(subdivided), context.STATIC_DRAW);
            context.vertexAttribPointer(attributeLocation, 3, context.FLOAT, false, 0, 0);
            context.bindBuffer(context.ARRAY_BUFFER, null);
            this.count = subdivided.length / 3;

        }
        // {
        //     const attributeLocation = context.getAttribLocation(this.program, "a_edge");
        //     if (attributeLocation === -1) {
        //         throw new Error("Failed to get attribute location");
        //     }
        //     const buffer = this.buffer1;
        //     if (buffer === null) {
        //         throw new Error("Failed to create buffer");
        //     }
        //     context.enableVertexAttribArray(attributeLocation);
        //     context.bindBuffer(context.ARRAY_BUFFER, buffer);
        //     const data: number[] = this.edges;
        //     context.bufferData(context.ARRAY_BUFFER, new Int8Array(data), context.STATIC_DRAW);
        //     context.vertexAttribIPointer(attributeLocation, 1, context.BYTE, 0, 0);
        //     context.vertexAttribDivisor(attributeLocation, 1);
        //     context.bindBuffer(context.ARRAY_BUFFER, null);
        // }
        // {
        //     const attributeLocation = context.getAttribLocation(this.program, "a_scale");
        //     if (attributeLocation === -1) {
        //         throw new Error("Failed to get attribute location");
        //     }
        //     const buffer = this.buffer2;
        //     if (buffer === null) {
        //         throw new Error("Failed to create buffer");
        //     }
        //     context.enableVertexAttribArray(attributeLocation);
        //     context.bindBuffer(context.ARRAY_BUFFER, buffer);
        //     const data: number[] = this.scales;
        //     context.bufferData(context.ARRAY_BUFFER, new Float32Array(data), context.STATIC_DRAW);
        //     context.vertexAttribPointer(attributeLocation, 1, context.FLOAT, false, 0, 0);
        //     context.vertexAttribDivisor(attributeLocation, 1);
        //     context.bindBuffer(context.ARRAY_BUFFER, null);
        // }
        // {
        //     const attributeLocation = context.getAttribLocation(this.program, "a_offset");
        //     if (attributeLocation === -1) {
        //         throw new Error("Failed to get attribute location");
        //     }
        //     const buffer = this.buffer3;
        //     if (buffer === null) {
        //         throw new Error("Failed to create buffer");
        //     }
        //     context.enableVertexAttribArray(attributeLocation);
        //     context.bindBuffer(context.ARRAY_BUFFER, buffer);
        //     const data: number[] = this.offsets;
        //     context.bufferData(context.ARRAY_BUFFER, new Float32Array(data), context.STATIC_DRAW);
        //     context.vertexAttribPointer(attributeLocation, 2, context.FLOAT, false, 0, 0);
        //     context.vertexAttribDivisor(attributeLocation, 1);
        //     context.bindBuffer(context.ARRAY_BUFFER, null);
        // }

    }
    render() {
        const context = this.context;
        context.clear(context.COLOR_BUFFER_BIT | context.DEPTH_BUFFER_BIT);
        context.bindVertexArray(this.vao);
        // context.uniform1f(context.getUniformLocation(this.program, "u_elapsed"), this.elapsed / 1000.0);
        context.uniformMatrix4fv(this.loc_model, false, Matrix.rotationZ(this.elapsed / 1000).getVertics());
        for(let i = 0; i < this.tiles; i++) {
            context.uniform1i(this.loc_edge, this.edges[i]);
            context.uniform1f(this.loc_scale, this.scales[i]);
            context.uniform2fv(this.loc_offset, [this.offsets[i * 2], this.offsets[i * 2 + 1]]);
            context.drawArrays(context.LINES, 0, this.count);
        }
        // context.drawArrays(context.TRIANGLES, 0, 6)
        context.bindVertexArray(null);
    }
    initShaderProgram() {
        const context = this.context;
        if (this.vertexShaderSource === undefined || this.fragmentShaderSource === undefined) {
            throw new Error("Shader source is undefined");
        }
        const program = this.program;
        const vertexShader = context.createShader(context.VERTEX_SHADER);
        if (vertexShader === null) {
            throw new Error("Failed to create vertex shader");
        }
        context.shaderSource(vertexShader, this.vertexShaderSource);
        context.compileShader(vertexShader);
        if (!context.getShaderParameter(vertexShader, context.COMPILE_STATUS)) {
            console.error(context.getShaderInfoLog(vertexShader));
            throw new Error("Failed to compile vertex shader");
        }
        context.attachShader(program, vertexShader);
        const fragmentShader = context.createShader(context.FRAGMENT_SHADER);
        if (fragmentShader === null) {
            throw new Error("Failed to create fragment shader");
        }
        context.shaderSource(fragmentShader, this.fragmentShaderSource);
        context.compileShader(fragmentShader);
        if (!context.getShaderParameter(fragmentShader, context.COMPILE_STATUS)) {
            console.error(context.getShaderInfoLog(fragmentShader));
            throw new Error("Failed to compile fragment shader");
        }
        context.attachShader(program, fragmentShader);
        context.linkProgram(program);
        if (!context.getProgramParameter(program, context.LINK_STATUS)) {
            console.error(context.getProgramInfoLog(program));
            throw new Error("Failed to link program");
        }
    }
}

const renderer = new WebGLRenderer();
renderer.tick(0);