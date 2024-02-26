export default class Texture {
    attachToFramebuffer(context: WebGL2RenderingContext, attachment: number) {
        context.framebufferTexture2D(context.FRAMEBUFFER, attachment, context.TEXTURE_2D, this.texture, 0);
    }
    private readonly texture: WebGLTexture;
    constructor(texture: WebGLTexture) {
        this.texture = texture;
    }
    static create(context: WebGL2RenderingContext) {
        return new Texture(context.createTexture()!);
    }
    bind(context: WebGL2RenderingContext) {
        context.bindTexture(context.TEXTURE_2D, this.texture);
    }
    active(context: WebGL2RenderingContext, unit: number) {
        context.activeTexture(context.TEXTURE0 + unit);
    }
    unbind(context: WebGL2RenderingContext) {
        context.bindTexture(context.TEXTURE_2D, null);
    }
    generateDepth(context: WebGL2RenderingContext, width: number, height: number) {
        context.bindTexture(context.TEXTURE_2D, this.texture);
        context.texImage2D(context.TEXTURE_2D, 0, context.DEPTH_COMPONENT32F, width, height, 0, context.DEPTH_COMPONENT, context.FLOAT, null);
        context.texParameteri(context.TEXTURE_2D, context.TEXTURE_WRAP_S, context.CLAMP_TO_EDGE);
        context.texParameteri(context.TEXTURE_2D, context.TEXTURE_WRAP_T, context.CLAMP_TO_EDGE);
        context.texParameteri(context.TEXTURE_2D, context.TEXTURE_MIN_FILTER, context.NEAREST);
        context.texParameteri(context.TEXTURE_2D, context.TEXTURE_MAG_FILTER, context.NEAREST);
        context.bindTexture(context.TEXTURE_2D, null);
    }
    generateDiffuse(context: WebGL2RenderingContext, width: number, height: number) {
        context.bindTexture(context.TEXTURE_2D, this.texture);
        context.texImage2D(context.TEXTURE_2D, 0, context.RGBA, width, height, 0, context.RGBA, context.UNSIGNED_BYTE, null);
        context.texParameteri(context.TEXTURE_2D, context.TEXTURE_WRAP_S, context.CLAMP_TO_EDGE);
        context.texParameteri(context.TEXTURE_2D, context.TEXTURE_WRAP_T, context.CLAMP_TO_EDGE);
        context.texParameteri(context.TEXTURE_2D, context.TEXTURE_MIN_FILTER, context.LINEAR);
        context.texParameteri(context.TEXTURE_2D, context.TEXTURE_MAG_FILTER, context.LINEAR);
        context.bindTexture(context.TEXTURE_2D, null);
    }
    generateNormal(context: WebGL2RenderingContext, width: number, height: number) {
        context.bindTexture(context.TEXTURE_2D, this.texture);
        context.texImage2D(context.TEXTURE_2D, 0, context.RGB, width, height, 0, context.RGB, context.UNSIGNED_BYTE, null);
        context.texParameteri(context.TEXTURE_2D, context.TEXTURE_WRAP_S, context.CLAMP_TO_EDGE);
        context.texParameteri(context.TEXTURE_2D, context.TEXTURE_WRAP_T, context.CLAMP_TO_EDGE);
        context.texParameteri(context.TEXTURE_2D, context.TEXTURE_MIN_FILTER, context.LINEAR);
        context.texParameteri(context.TEXTURE_2D, context.TEXTURE_MAG_FILTER, context.LINEAR);
        context.bindTexture(context.TEXTURE_2D, null);
    }
    
}