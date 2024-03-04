export default class Texture {
    private texture: WebGLTexture | null = null;
    private readonly unit: number;
    private readonly width: number;
    private readonly height: number;
    readonly name: string;
    readonly program: string;
    constructor(name: string, unit: number, program: string, width: number, height: number) {
        this.name = name;
        this.program = program;
        this.unit = unit;
        this.width = width;
        this.height = height;
    }
    static create(name: string, unit: number, program: string, width: number, height: number) {
        return new Texture(name, unit, program, width, height);
    }
    attachToFramebuffer(context: WebGL2RenderingContext, attachment: number) {
        context.framebufferTexture2D(context.FRAMEBUFFER, attachment, context.TEXTURE_2D, this.texture, 0);
    }
    bind(context: WebGL2RenderingContext) {
        context.bindTexture(context.TEXTURE_2D, this.texture);
    }
    active(context: WebGL2RenderingContext) {
        context.activeTexture(context.TEXTURE0 + this.unit);
    }
    unbind(context: WebGL2RenderingContext) {
        context.bindTexture(context.TEXTURE_2D, null);
    }
    generateDepth(context: WebGL2RenderingContext) {
        this.texture = context.createTexture();
        context.bindTexture(context.TEXTURE_2D, this.texture);
        context.texImage2D(context.TEXTURE_2D, 0, context.DEPTH_COMPONENT32F, this.width, this.height, 0, context.DEPTH_COMPONENT, context.FLOAT, null);
        context.texParameteri(context.TEXTURE_2D, context.TEXTURE_WRAP_S, context.CLAMP_TO_EDGE);
        context.texParameteri(context.TEXTURE_2D, context.TEXTURE_WRAP_T, context.CLAMP_TO_EDGE);
        context.texParameteri(context.TEXTURE_2D, context.TEXTURE_MIN_FILTER, context.NEAREST);
        context.texParameteri(context.TEXTURE_2D, context.TEXTURE_MAG_FILTER, context.NEAREST);
        context.bindTexture(context.TEXTURE_2D, null);
    }
    generateDiffuse(context: WebGL2RenderingContext) {
        this.texture = context.createTexture();
        context.bindTexture(context.TEXTURE_2D, this.texture);
        context.texImage2D(context.TEXTURE_2D, 0, context.RGBA, this.width, this.height, 0, context.RGBA, context.UNSIGNED_BYTE, null);
        context.texParameteri(context.TEXTURE_2D, context.TEXTURE_WRAP_S, context.CLAMP_TO_EDGE);
        context.texParameteri(context.TEXTURE_2D, context.TEXTURE_WRAP_T, context.CLAMP_TO_EDGE);
        context.texParameteri(context.TEXTURE_2D, context.TEXTURE_MIN_FILTER, context.LINEAR);
        context.texParameteri(context.TEXTURE_2D, context.TEXTURE_MAG_FILTER, context.LINEAR);
        context.bindTexture(context.TEXTURE_2D, null);
    }
    generateNormal(context: WebGL2RenderingContext) {
        this.texture = context.createTexture();
        context.bindTexture(context.TEXTURE_2D, this.texture);
        context.texImage2D(context.TEXTURE_2D, 0, context.RGB, this.width, this.height, 0, context.RGB, context.UNSIGNED_BYTE, null);
        context.texParameteri(context.TEXTURE_2D, context.TEXTURE_WRAP_S, context.CLAMP_TO_EDGE);
        context.texParameteri(context.TEXTURE_2D, context.TEXTURE_WRAP_T, context.CLAMP_TO_EDGE);
        context.texParameteri(context.TEXTURE_2D, context.TEXTURE_MIN_FILTER, context.LINEAR);
        context.texParameteri(context.TEXTURE_2D, context.TEXTURE_MAG_FILTER, context.LINEAR);
        context.bindTexture(context.TEXTURE_2D, null);
    }
    destory(context: WebGL2RenderingContext) {
        context.deleteTexture(this.texture);
    }

}