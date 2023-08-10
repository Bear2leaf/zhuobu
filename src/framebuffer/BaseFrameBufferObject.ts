import RenderingContext from "../renderingcontext/RenderingContext.js";
import BaseTexture from "../texture/BaseTexture.js";
import { TextureIndex } from "../texture/Texture.js";
import FrameBufferObject from "./FrameBufferObject.js";

export default class BaseFrameBufferObject implements FrameBufferObject {
    private gl?: RenderingContext;
    private fboIndex?: number;

    create(gl: RenderingContext) {
        this.gl = gl;
        this.fboIndex = this.gl.createFramebuffer();
    }
    bind(): void {
        this.getGL().bindFramebuffer(this.getFBOIndex());
    }
    unbind(): void {
        this.getGL().bindFramebuffer();
    }
    attach(texture: BaseTexture): void {
        this.bind();
        if (texture.getBindIndex() === TextureIndex.Depth) {
            this.getGL().framebufferDepthTexture2D(texture.getTextureIndex());
        } else if (texture.getBindIndex() === TextureIndex.Pick) {
            this.getGL().framebufferPickTexture2D(texture.getTextureIndex());
        } else {
            throw new Error("attach Not implemented");
        }
    }
    getGL() {
        if (this.gl === undefined) {
            throw new Error("BaseFrameBufferObject is not initialized.");
        }
        return this.gl;
    }
    getFBOIndex() {
        if (this.fboIndex === undefined) {
            throw new Error("BaseFrameBufferObject is not initialized.");
        }
        return this.fboIndex;
    }

}