import Device from "../device/Device.js";

export default class Program {

    private readonly program: WebGLProgram;
    private loc_model: WebGLUniformLocation | null = null;
    private vertexShaderSource = "";
    private fragmentShaderSource = "";
    name = "";
    constructor(context: WebGL2RenderingContext) {
        this.program = context.createProgram()!;
    }
    static create(context: WebGL2RenderingContext): Program {
        return new Program(context);
    }
    updateTerrainFBOUniforms(context: WebGL2RenderingContext, edges: number[], scales: number[], offsets: number[]) {
        context.uniform1i(context.getUniformLocation(this.program, "u_texture"), 0);
        context.uniform1i(context.getUniformLocation(this.program, "u_textureDepth"), 1);
        context.uniform1i(context.getUniformLocation(this.program, "u_textureNormal"), 2);
        context.uniform1iv(context.getUniformLocation(this.program, "u_edges"), edges);
        context.uniform1fv(context.getUniformLocation(this.program, "u_scales"), scales);
        context.uniform2fv(context.getUniformLocation(this.program, "u_offsets"), offsets);
    }
    updateTerrainModel(context: WebGL2RenderingContext, data: Matrix) {
        if (this.loc_model === null) {
            this.loc_model = context.getUniformLocation(this.program, "u_model");
        }
        context.uniformMatrix4fv(this.loc_model, false, data);
    }
    activeVertexAttribArray(context: WebGL2RenderingContext, name: string, size: number, type: number) {
        const attributeLocation = context.getAttribLocation(this.program, name);
        context.enableVertexAttribArray(attributeLocation);
        context.vertexAttribPointer(attributeLocation, size, type, false, 0, 0);
    }

    async loadShaderSource(device: Device) {
        this.vertexShaderSource = await device.readText(`resources/glsl/${this.name}.vert.sk`)
        this.fragmentShaderSource = await device.readText(`resources/glsl/${this.name}.frag.sk`)
    }
    active(context: WebGL2RenderingContext) {
        context.useProgram(this.program);
    }
    deactive(context: WebGL2RenderingContext) {
        context.useProgram(null);
    }
    init(context: WebGL2RenderingContext) {
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
}