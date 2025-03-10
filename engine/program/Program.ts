import Device from "../device/Device.js";

export default class Program {

    private program: WebGLProgram | null = null;
    private transformFeedback: WebGLTransformFeedback | null = null;
    private readonly locMap: Map<string, WebGLUniformLocation | null>;
    private readonly attrLocMap: Map<string, number>;
    private readonly valueMap: Map<string, number[]>;
    readonly varyings?: string[];
    private vertexShaderSource = "";
    private fragmentShaderSource = "";
    readonly name;
    constructor(name: string, varyings?: string[]) {
        this.name = name;
        this.locMap = new Map();
        this.attrLocMap = new Map();
        this.valueMap = new Map();
        this.varyings = varyings;
    }
    static create(name: string, varyings?: string[]): Program {
        return new Program(name, varyings);
    }
    cacheLoc(context: WebGL2RenderingContext, name: string) {
        let loc = this.locMap.get(name);
        if (loc !== undefined) {
        } else {
            loc = context.getUniformLocation(this.program!, name);
            this.locMap.set(name, loc);
        }
        return loc;
    }
    cacheAttrLoc(context: WebGL2RenderingContext, name: string) {
        let loc = this.attrLocMap.get(name);
        if (loc !== undefined) {
        } else {
            loc = context.getAttribLocation(this.program!, name);
            this.attrLocMap.set(name, loc);
        }
        return loc;
    }
    sameVal(name: string, values: number[]) {
        const old = this.valueMap.get(name);
        if (old === undefined) {
            return false;
        }
        if (old.length !== values.length) {
            return false;
        }
        for (let i = 0; i < old.length; i++) {
            if (old[i] !== values[i]) {
                return false;
            }
        }
        return true;
    }
    updateUniform1i(context: WebGL2RenderingContext, name: string, values: number[]) {
        this.sameVal(name, values) || context.uniform1i(this.cacheLoc(context, name), values[0]);
    }
    updateUniform1iv(context: WebGL2RenderingContext, name: string, values: number[]) {
        this.sameVal(name, values) || context.uniform1iv(this.cacheLoc(context, name), values);
    }
    updateUniform1fv(context: WebGL2RenderingContext, name: string, values: number[]) {
        this.sameVal(name, values) || context.uniform1fv(this.cacheLoc(context, name), values);
    }
    updateUniform2fv(context: WebGL2RenderingContext, name: string, values: number[]) {
        this.sameVal(name, values) || context.uniform2fv(this.cacheLoc(context, name), values);
    }
    updateUniform3fv(context: WebGL2RenderingContext, name: string, values: number[]) {
        this.sameVal(name, values) || context.uniform3fv(this.cacheLoc(context, name), values);
    }
    updateUniform4fv(context: WebGL2RenderingContext, name: string, values: number[]) {
        this.sameVal(name, values) || context.uniform4fv(this.cacheLoc(context, name), values);
    }
    updateUniformMatrix4fv(context: WebGL2RenderingContext, name: string, values: number[]) {
        this.sameVal(name, values) || context.uniformMatrix4fv(this.cacheLoc(context, name), false, values);
    }
    activeVertexAttribArray(context: WebGL2RenderingContext, name: string, size: number, type: number, divisor: number = 0) {
        const attributeLocation = context.getAttribLocation(this.program!, name);
        context.enableVertexAttribArray(attributeLocation);
        if (type === context.INT || type === context.UNSIGNED_BYTE) {
            // TRY NOT USE TYPE SIZE LESS THAN INT IN MINIGAME, INSTANCED DRAWING PERF ISSUE!
            context.vertexAttribIPointer(attributeLocation, size, type, 0, 0);
        } else {
            context.vertexAttribPointer(attributeLocation, size, type, false, 0, 0);
        }
        if (divisor) {
            context.vertexAttribDivisor(attributeLocation, divisor);
        }
    }

    async loadShaderSource(device: Device) {
        this.vertexShaderSource = await device.readText(`resource/glsl/${this.name}.vert.sk`)
        this.fragmentShaderSource = await device.readText(`resource/glsl/${this.name}.frag.sk`)
    }
    active(context: WebGL2RenderingContext) {
        context.useProgram(this.program);
        context.bindTransformFeedback(context.TRANSFORM_FEEDBACK, this.transformFeedback);
    }
    deactive(context: WebGL2RenderingContext) {
        context.bindTransformFeedback(context.TRANSFORM_FEEDBACK, null);
        context.useProgram(null);
    }
    init(context: WebGL2RenderingContext) {
        this.program = context.createProgram()!;
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
        if (this.varyings) {
            this.transformFeedback = context.createTransformFeedback()!;
            context.transformFeedbackVaryings(this.program, this.varyings, context.SEPARATE_ATTRIBS);
        }
        context.linkProgram(program);
        if (!context.getProgramParameter(program, context.LINK_STATUS)) {
            console.error(context.getProgramInfoLog(program));
            throw new Error("Failed to link program");
        }
        context.deleteShader(vertexShader)
        context.deleteShader(fragmentShader)

    }
}