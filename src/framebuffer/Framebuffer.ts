import Texture from "../texture/Texture.js";

export default class Framebuffer {
    private readonly framebuffer: WebGLFramebuffer;
    constructor(framebuffer: WebGLFramebuffer) {
        this.framebuffer = framebuffer;
    }
    static create(context: WebGL2RenderingContext) {
        return new Framebuffer(context.createFramebuffer()!);
    }
    bind(context: WebGL2RenderingContext) {
        context.bindFramebuffer(context.FRAMEBUFFER, this.framebuffer);
    }
    unbind(context: WebGL2RenderingContext) {
        context.bindFramebuffer(context.FRAMEBUFFER, null);
    }
    createTerrainFramebuffer(context: WebGL2RenderingContext, depth: Texture, diffuse: Texture, normal: Texture) {
        context.bindFramebuffer(context.FRAMEBUFFER, this.framebuffer);
        diffuse.attachToFramebuffer(context, context.COLOR_ATTACHMENT0);
        diffuse.bind(context);
        depth.attachToFramebuffer(context, context.DEPTH_ATTACHMENT);
        depth.bind(context);
        normal.attachToFramebuffer(context, context.COLOR_ATTACHMENT1);
        normal.bind(context);
        context.drawBuffers([context.COLOR_ATTACHMENT0, context.COLOR_ATTACHMENT1]);
        context.bindFramebuffer(context.FRAMEBUFFER, null);
    }
}