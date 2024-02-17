import { WindowInfo } from "./device/Device.js";
import Matrix from "./geometry/Matrix.js";
import { Vec4 } from "./geometry/Vector.js";
import Map from "./map/Map.js";
import SeedableRandom from "./map/SeedableRandom.js";
import TriangleMesh from "./map/TriangleMesh.js";
import MeshBuilder from "./map/create.js";
import { createNoise2D } from "./map/simplex-noise.js";
import { smoothstep } from "./map/util.js";
import PoissonDiskSampling from "./poisson/index.js";
enum Edge {
    NONE = 0,
    TOP = 1,
    LEFT = 2,
    BOTTOM = 4,
    RIGHT = 8,
};

enum BiomeColor {
    BARE = 136 << 16 | 136 << 8 | 136,
    BEACH = 160 << 16 | 144 << 8 | 119,
    COAST = 51 << 16 | 51 << 8 | 90,
    GRASSLAND = 136 << 16 | 170 << 8 | 85,
    ICE = 153 << 16 | 255 << 8 | 255,
    LAKE = 51 << 16 | 102 << 8 | 153,
    LAKESHORE = 34 << 16 | 85 << 8 | 136,
    MARSH = 47 << 16 | 102 << 8 | 102,
    OCEAN = 68 << 16 | 68 << 8 | 122,
    RIVER = 34 << 16 | 85 << 8 | 136,
    SCORCHED = 85 << 16 | 85 << 8 | 85,
    SHRUBLAND = 136 << 16 | 153 << 8 | 119,
    SNOW = 255 << 16 | 255 << 8 | 255,
    SUBTROPICAL_DESERT = 210 << 16 | 185 << 8 | 139,
    TAIGA = 153 << 16 | 170 << 8 | 119,
    TEMPERATE_DECIDUOUS_FOREST = 103 << 16 | 148 << 8 | 89,
    TEMPERATE_DESERT = 201 << 16 | 210 << 8 | 155,
    TEMPERATE_RAIN_FOREST = 68 << 16 | 136 << 8 | 85,
    TROPICAL_RAIN_FOREST = 51 << 16 | 119 << 8 | 85,
    TROPICAL_SEASONAL_FOREST = 85 << 16 | 153 << 8 | 68,
    TUNDRA = 187 << 16 | 187 << 8 | 170,
};
export default class WebGLRenderer {
    private readonly vertexShaderSource = `#version 300 es 
layout(location = 0) in vec3 a_position;
// layout(location = 1) in /* uniform */ int a_edge;
// layout(location = 2) in /* uniform */ vec2 a_offset;
// layout(location = 3) in /* uniform */ float a_scale;
 uniform mat4 u_model;
 uniform int u_edges[52];
 uniform vec2 u_offsets[52];
 uniform float u_scales[52];
 uniform sampler2D u_textureDepth;

 out vec3 v_color;
 out vec2 v_position;

 const float u_resolution = 64.0f;
 const int EDGE_MORPH_TOP = 1;
 const int EDGE_MORPH_LEFT = 2;
 const int EDGE_MORPH_BOTTOM = 4;
 const int EDGE_MORPH_RIGHT = 8;
 

 const float MORPH_REGION = 0.3f;
 // Poor man's bitwise &
 bool edgePresent(int edge) {
    int u_edge = u_edges[gl_InstanceID];
     int e = u_edge / edge;
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
    float u_scale = u_scales[gl_InstanceID];
     vec2 fraction = fract(a_position.xz * u_resolution * 0.5f) * 2.0f / u_resolution;
     return position - fraction * morphK * u_scale;
 }
 
 
void main() {

    float u_scale = u_scales[gl_InstanceID];
    vec2 u_offset = u_offsets[gl_InstanceID];
     vec2 origin = a_position.xz;
     // Morph between zoom layers
     float morphK = calculateMorph(origin);
     vec2 position = origin * u_scale + u_offset;
     position = calculateNoMorphNeighbour(position, morphK);
     position = clamp(position, -0.9f, 0.9f);
     float height = texture(u_textureDepth, position * 0.5f + 0.5f).r;
     height = height * 2.0f - 1.0f;
    gl_Position = u_model * vec4(position.x, height, position.y, 1.0f);
    v_position = position;
}
    `;
    private readonly fragmentShaderSource = `#version 300 es
precision highp float;

in vec2 v_position;

uniform float u_elapsed;
uniform sampler2D u_texture;

out vec4 color;

vec3 getDiffuse() {
    // return vec3(1.0f);
    return texture(u_texture, v_position / 2.0f + 0.5f).rgb;
}

void main() {
    color = vec4(getDiffuse(), 1.0f);
}

    `;
    private readonly textureVertexShaderSource = `#version 300 es 
    layout(location = 0) in vec3 a_position;
    layout(location = 1) in vec3 a_color;
    
    
    out vec3 v_color;
    void main() {
        gl_Position =  vec4(a_position, 1.0f);
        v_color = a_color;
    }`;
    private readonly textureFragmentShaderSource = `#version 300 es
    precision highp float;
    in vec3 v_color;
    
    
    layout(location = 0) out vec4 o_diffuse;
    
    void main() {
        o_diffuse = vec4(v_color, 1.0f);
    }`
    private readonly context: WebGL2RenderingContext;
    private readonly program: WebGLProgram;
    private readonly textureProgram: WebGLProgram;
    private readonly vao: WebGLVertexArrayObject;
    private readonly textureVAO: WebGLVertexArrayObject;
    private readonly buffer0: WebGLBuffer;
    private readonly buffer1: WebGLBuffer;
    private readonly buffer2: WebGLBuffer;
    private readonly buffer3: WebGLBuffer;
    private readonly loc_model: WebGLUniformLocation;
    private readonly loc_edges: WebGLUniformLocation;
    private readonly loc_scales: WebGLUniformLocation;
    private readonly loc_offsets: WebGLUniformLocation;
    private readonly loc_diffuse: WebGLUniformLocation;
    private readonly loc_depth: WebGLUniformLocation;
    private readonly terrainFramebuffer: WebGLFramebuffer;
    private readonly depthTexture: WebGLTexture;
    private readonly diffuseTexture: WebGLTexture;
    private readonly scales: number[] = [];
    private readonly offsets: number[] = [];
    private readonly edges: number[] = [];
    private readonly windowInfo: WindowInfo;
    private count: number = 0;
    private textureCount: number = 0;
    private tiles: number = 0;
    private elapsed = 0;
    private delta = 0;
    private now = 0;
    private readonly spacing = 16;
    private readonly distanceRNG = new SeedableRandom(40);
    private readonly simplex = { noise2D: createNoise2D(() => this.distanceRNG.nextFloat()) };
    private readonly rng = new SeedableRandom(25);
    private readonly map = new Map(new TriangleMesh(new MeshBuilder({ boundarySpacing: this.spacing }).addPoisson(PoissonDiskSampling, this.spacing, () => this.rng.nextFloat()).create()), {
        amplitude: 0.5,
        length: 4,
    }, () => (N) => Math.round(this.rng.nextFloat() * N));
    constructor() {
        if (typeof wx === "undefined") {
            const canvas = document.createElement("canvas");
            this.windowInfo = {
                pixelRatio: 1,
                windowHeight: 1024,
                windowWidth: 1024,
            }
            canvas.width = this.windowInfo.windowWidth * this.windowInfo.pixelRatio;
            canvas.height = this.windowInfo.windowHeight * this.windowInfo.pixelRatio;
            canvas.style.width = "100%";
            document.body.append(canvas);
            this.context = canvas.getContext("webgl2")!;
        } else {
            this.context = wx.createCanvas().getContext("webgl2") as WebGL2RenderingContext;
            this.windowInfo = {
                pixelRatio: wx.getWindowInfo().pixelRatio,
                windowHeight: wx.getWindowInfo().windowHeight,
                windowWidth: wx.getWindowInfo().windowWidth,
            }
        }
        this.program = this.context.createProgram()!;
        this.textureProgram = this.context.createProgram()!;
        this.initShaderProgram();
        this.vao = this.context.createVertexArray()!;
        this.textureVAO = this.context.createVertexArray()!;
        this.buffer0 = this.context.createBuffer()!;
        this.buffer1 = this.context.createBuffer()!;
        this.buffer2 = this.context.createBuffer()!;
        this.buffer3 = this.context.createBuffer()!;
        this.depthTexture = this.context.createTexture()!;
        this.diffuseTexture = this.context.createTexture()!;
        this.terrainFramebuffer = this.context.createFramebuffer()!;
        this.initCDLODGrid();
        this.loc_model = this.context.getUniformLocation(this.program, "u_model")!;
        this.loc_edges = this.context.getUniformLocation(this.program, "u_edges")!;
        this.loc_scales = this.context.getUniformLocation(this.program, "u_scales")!;
        this.loc_offsets = this.context.getUniformLocation(this.program, "u_offsets")!;
        this.loc_depth = this.context.getUniformLocation(this.program, "u_textureDepth")!;
        this.loc_diffuse = this.context.getUniformLocation(this.program, "u_texture")!;
        this.createDepthTexture()
        this.createDiffuseTexture()
        this.initMap();
        this.createTerrainFramebuffer();
        this.initDrawobject();
        this.renderTexture();
        requestAnimationFrame((time) => this.now = time);
    }
    createTerrainFramebuffer() {
        const context = this.context;
        context.bindFramebuffer(context.FRAMEBUFFER, this.terrainFramebuffer);
        context.activeTexture(context.TEXTURE0);
        context.bindTexture(context.TEXTURE_2D, this.diffuseTexture);
        context.activeTexture(context.TEXTURE1);
        context.bindTexture(context.TEXTURE_2D, this.depthTexture);
        context.framebufferTexture2D(context.FRAMEBUFFER, context.DEPTH_ATTACHMENT, context.TEXTURE_2D, this.depthTexture, 0);
        context.framebufferTexture2D(context.FRAMEBUFFER, context.COLOR_ATTACHMENT0, context.TEXTURE_2D, this.diffuseTexture, 0);
        context.drawBuffers([context.COLOR_ATTACHMENT0]);
        context.bindFramebuffer(context.FRAMEBUFFER, null);
    }
    createDepthTexture() {
        const context = this.context;
        context.bindTexture(context.TEXTURE_2D, this.depthTexture);
        context.texImage2D(context.TEXTURE_2D, 0, context.DEPTH_COMPONENT32F, this.windowInfo.windowWidth * this.windowInfo.pixelRatio, this.windowInfo.windowHeight * this.windowInfo.pixelRatio, 0, context.DEPTH_COMPONENT, context.FLOAT, null);
        context.texParameteri(context.TEXTURE_2D, context.TEXTURE_WRAP_S, context.CLAMP_TO_EDGE);
        context.texParameteri(context.TEXTURE_2D, context.TEXTURE_WRAP_T, context.CLAMP_TO_EDGE);
        context.texParameteri(context.TEXTURE_2D, context.TEXTURE_MIN_FILTER, context.NEAREST);
        context.texParameteri(context.TEXTURE_2D, context.TEXTURE_MAG_FILTER, context.NEAREST);
        context.bindTexture(context.TEXTURE_2D, null);
    }
    createDiffuseTexture() {
        const context = this.context;
        context.bindTexture(context.TEXTURE_2D, this.diffuseTexture);
        context.texImage2D(context.TEXTURE_2D, 0, context.RGBA, this.windowInfo.windowWidth * this.windowInfo.pixelRatio, this.windowInfo.windowHeight * this.windowInfo.pixelRatio, 0, context.RGBA, context.UNSIGNED_BYTE, null);
        context.texParameteri(context.TEXTURE_2D, context.TEXTURE_WRAP_S, context.CLAMP_TO_EDGE);
        context.texParameteri(context.TEXTURE_2D, context.TEXTURE_WRAP_T, context.CLAMP_TO_EDGE);
        context.texParameteri(context.TEXTURE_2D, context.TEXTURE_MIN_FILTER, context.LINEAR);
        context.texParameteri(context.TEXTURE_2D, context.TEXTURE_MAG_FILTER, context.NEAREST);
        context.bindTexture(context.TEXTURE_2D, null);
    }
    initMap() {

        this.map.calculate({
            noise: this.simplex,
            shape: { round: 0.5, inflate: 0.3, amplitudes: [1 / 3, 1 / 4, 1 / 8, 1 / 16] },
            numRivers: 20,
            drainageSeed: 0,
            riverSeed: 0,
            noisyEdge: { length: 10, amplitude: 0.2, seed: 0 },
            biomeBias: { north_temperature: 0, south_temperature: 0, moisture: 0 },
        })
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

        requestAnimationFrame((time) => {
            this.render();
            this.render();
            this.render();
            this.render();
            this.tick(time);
        })
    }
    adjustHeight(height: number) {

        return smoothstep(-1.0, 1.0, Math.pow(height, 3)) - 0.6;
        // return Math.pow(height, 3);
        // return height;
    }
    initDrawobject() {
        const context = this.context;
        context.clearColor(0, 0, 0, 1);
        context.viewport(0, 0, this.windowInfo.windowWidth * this.windowInfo.pixelRatio, this.windowInfo.windowHeight * this.windowInfo.pixelRatio);
        context.scissor(0, 0, this.windowInfo.windowWidth * this.windowInfo.pixelRatio, this.windowInfo.windowHeight * this.windowInfo.pixelRatio);
        context.enable(context.DEPTH_TEST);
        context.enable(context.CULL_FACE);
        context.enable(context.SCISSOR_TEST)
        context.blendFunc(context.ONE, context.ONE_MINUS_SRC_ALPHA);
        context.blendFuncSeparate(context.SRC_ALPHA, context.ONE_MINUS_SRC_ALPHA, context.ONE, context.ONE);
        {
            context.useProgram(this.program);
            context.bindVertexArray(this.vao);
            context.uniform1i(this.loc_diffuse, 0);
            context.uniform1i(this.loc_depth, 1);
            context.uniform1iv(this.loc_edges, this.edges);
            context.uniform1fv(this.loc_scales, this.scales);
            context.uniform2fv(this.loc_offsets, this.offsets);
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
                        x0, 0, z0,
                        x1, 0, z0,
                        x1, 0, z1,
                        x1, 0, z1,
                        x0, 0, z1,
                        x0, 0, z0,
                    );
                }
            }
            context.bufferData(context.ARRAY_BUFFER, new Float32Array(subdivided), context.STATIC_DRAW);
            context.vertexAttribPointer(attributeLocation, 3, context.FLOAT, false, 0, 0);
            context.bindBuffer(context.ARRAY_BUFFER, null);
            this.count = subdivided.length / 3;

        }
        {

            context.useProgram(this.textureProgram);
            const vertices: number[] = []
            const colors: number[] = []

            const map = this.map;
            for (let s = 0; s < map.mesh.numSolidSides; s++) {
                const r = map.mesh.s_begin_r(s),
                    t1 = map.mesh.s_inner_t(s),
                    t2 = map.mesh.s_outer_t(s);
                const biome = map.r_biome[r] as keyof typeof BiomeColor;
                const color: BiomeColor = BiomeColor[biome];
                const pos1: [number, number] = [0, 0];
                const pos2: [number, number] = [0, 0];
                const pos3: [number, number] = [0, 0];
                map.mesh.r_pos(pos1, r);
                map.mesh.t_pos(pos2, t1);
                map.mesh.t_pos(pos3, t2);
                // const r0 = map.mesh.s_begin_r(s),
                //     r1 = map.mesh.s_end_r(s);
                // if (((map.s_flow[s] > 0 || map.s_flow[map.mesh.s_opposite_s(s)] > 0)
                //     && !map.r_water[r0] && !map.r_water[r1])) {
                //     const flow = 2 * Math.sqrt(map.s_flow[s]);
                //     rivers.push([[...pos2, adjustHeight(map.t_elevation[t1]), flow], [...pos3, adjustHeight(map.t_elevation[t2]), flow]]);
                // }
                pos1[0] = pos1[0] / 512.0 - 1.0;
                pos1[1] = pos1[1] / 512.0 - 1.0;
                pos2[0] = pos2[0] / 512.0 - 1.0;
                pos2[1] = pos2[1] / 512.0 - 1.0;
                pos3[0] = pos3[0] / 512.0 - 1.0;
                pos3[1] = pos3[1] / 512.0 - 1.0;
                vertices.push(...pos1, this.adjustHeight(map.r_elevation[r]));
                vertices.push(...pos2, this.adjustHeight(map.t_elevation[t1]));
                vertices.push(...pos3, this.adjustHeight(map.t_elevation[t2]));
                colors.push(...[
                    color >> 16
                    , color >> 8
                    , color
                ].map(x => (x & 0xff) / 255), ...[
                    color >> 16
                    , color >> 8
                    , color
                ].map(x => (x & 0xff) / 255), ...[
                    color >> 16
                    , color >> 8
                    , color
                ].map(x => (x & 0xff) / 255));

            }
            context.bindVertexArray(this.textureVAO);
            {
                const attributeLocation = context.getAttribLocation(this.textureProgram, "a_position");
                if (attributeLocation === -1) {
                    throw new Error("Failed to get attribute location");
                }
                const buffer = this.buffer1;
                if (buffer === null) {
                    throw new Error("Failed to create buffer");
                }
                context.enableVertexAttribArray(attributeLocation);
                context.bindBuffer(context.ARRAY_BUFFER, buffer);
                context.bufferData(context.ARRAY_BUFFER, new Float32Array(vertices), context.STATIC_DRAW);
                context.vertexAttribPointer(attributeLocation, 3, context.FLOAT, false, 0, 0);
                context.bindBuffer(context.ARRAY_BUFFER, null);
            }
            {
                const attributeLocation = context.getAttribLocation(this.textureProgram, "a_color");
                if (attributeLocation === -1) {
                    throw new Error("Failed to get attribute location");
                }
                const buffer = this.buffer2;
                if (buffer === null) {
                    throw new Error("Failed to create buffer");
                }
                context.enableVertexAttribArray(attributeLocation);
                context.bindBuffer(context.ARRAY_BUFFER, buffer);
                context.bufferData(context.ARRAY_BUFFER, new Float32Array(colors), context.STATIC_DRAW);
                context.vertexAttribPointer(attributeLocation, 3, context.FLOAT, false, 0, 0);
                context.bindBuffer(context.ARRAY_BUFFER, null);
            }
            this.textureCount = vertices.length / 3;

        }
    }
    render() {
        const context = this.context;
        context.useProgram(this.program);
        context.bindVertexArray(this.vao);
        context.clear(context.COLOR_BUFFER_BIT | context.DEPTH_BUFFER_BIT | context.STENCIL_BUFFER_BIT);
        context.uniformMatrix4fv(this.loc_model, false, Matrix.identity().translate(new Vec4(-0.75, -0.75, 0.0, 1.0)).rotateX(-Math.PI / 8).rotateY(this.elapsed / 1000).scale(new Vec4(0.5, 0.5, 0.5, 1.0)).getVertics());
        context.drawArraysInstanced(context.TRIANGLES, 0, this.count, this.tiles)
        context.bindVertexArray(null);
    }
    renderTexture() {
        const context = this.context;
        context.useProgram(this.textureProgram)
        context.bindFramebuffer(context.FRAMEBUFFER, this.terrainFramebuffer);
        context.clear(context.COLOR_BUFFER_BIT | context.DEPTH_BUFFER_BIT | context.STENCIL_BUFFER_BIT);
        context.bindVertexArray(this.textureVAO);
        context.drawArrays(context.TRIANGLES, 0, this.textureCount)
        context.bindFramebuffer(context.FRAMEBUFFER, null);
        context.bindVertexArray(null);
    }
    initShaderProgram() {
        const context = this.context;
        {
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
            if (this.vertexShaderSource === undefined || this.fragmentShaderSource === undefined) {
                throw new Error("Shader source is undefined");
            }
        }
        {
            const program = this.textureProgram;
            const vertexShader = context.createShader(context.VERTEX_SHADER);
            if (vertexShader === null) {
                throw new Error("Failed to create vertex shader");
            }
            context.shaderSource(vertexShader, this.textureVertexShaderSource);
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
            context.shaderSource(fragmentShader, this.textureFragmentShaderSource);
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
}

const renderer = new WebGLRenderer();
renderer.tick(0);