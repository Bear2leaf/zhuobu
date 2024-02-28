import Texture from "../texture/Texture.js";

export default class Framebuffer {
    private framebuffer: WebGLFramebuffer | null = null;
    readonly name: string;
    constructor(name: string) {
        this.name = name;
    }
    static create(name: string) {
        return new Framebuffer(name);
    }
    bind(context: WebGL2RenderingContext) {
        context.bindFramebuffer(context.FRAMEBUFFER, this.framebuffer);
    }
    unbind(context: WebGL2RenderingContext) {
        context.bindFramebuffer(context.FRAMEBUFFER, null);
    }
    generateTerrainFramebuffer(context: WebGL2RenderingContext, diffuse: Texture, depth: Texture, normal: Texture) {
        this.framebuffer = context.createFramebuffer();
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