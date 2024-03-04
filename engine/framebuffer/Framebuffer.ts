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
    generateTerrainFramebuffer(context: WebGL2RenderingContext, ...textures: Texture[]) {
        this.framebuffer = context.createFramebuffer();
        context.bindFramebuffer(context.FRAMEBUFFER, this.framebuffer);
        textures[0].attachToFramebuffer(context, context.COLOR_ATTACHMENT0);
        textures[0].bind(context);
        textures[1].attachToFramebuffer(context, context.DEPTH_ATTACHMENT);
        textures[1].bind(context);
        textures[2].attachToFramebuffer(context, context.COLOR_ATTACHMENT1);
        textures[2].bind(context);
        context.drawBuffers([context.COLOR_ATTACHMENT0, context.COLOR_ATTACHMENT1]);
        context.bindFramebuffer(context.FRAMEBUFFER, null);
    }
    generateWaterFramebuffer(context: WebGL2RenderingContext, ...textures: Texture[]) {
        this.framebuffer = context.createFramebuffer();
        context.bindFramebuffer(context.FRAMEBUFFER, this.framebuffer);
        textures[0].attachToFramebuffer(context, context.COLOR_ATTACHMENT1);
        textures[0].bind(context);
        textures[1].attachToFramebuffer(context, context.COLOR_ATTACHMENT2);
        textures[1].bind(context);
        context.drawBuffers([context.COLOR_ATTACHMENT0, context.COLOR_ATTACHMENT1, context.COLOR_ATTACHMENT2]);
        context.bindFramebuffer(context.FRAMEBUFFER, null);
    }
    destory(context: WebGL2RenderingContext) {
        context.deleteFramebuffer(this.framebuffer);
    }
}