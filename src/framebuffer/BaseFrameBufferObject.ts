import RenderingContext from "../renderingcontext/RenderingContext.js";
import Texture from "../texture/Texture.js";
import { TextureBindIndex } from "../renderingcontext/RenderingContext.js";
import FrameBufferObject from "./FrameBufferObject.js";

export default class BaseFrameBufferObject implements FrameBufferObject {
    private rc?: RenderingContext;
    private fboIndex?: number;

    create(rc: RenderingContext) {
        this.rc = rc;
        this.fboIndex = this.rc.createFramebuffer();
    }
    bind(): void {
        this.getGL().bindFramebuffer(this.getFBOIndex());
    }
    unbind(): void {
        this.getGL().bindFramebuffer();
    }
    attach(texture: Texture): void {
        this.bind();
        texture.active();
        texture.bind();
        if (texture.getBindIndex() === TextureBindIndex.Depth) {
            this.getGL().framebufferDepthTexture2D(texture.getTextureIndex());
        } else if (texture.getBindIndex() === TextureBindIndex.Pick) {
            this.getGL().framebufferPickTexture2D(texture.getTextureIndex());
        } else if (texture.getBindIndex() === TextureBindIndex.Render) {
            this.getGL().framebufferRenderTexture2D(texture.getTextureIndex());
        } else if (texture.getBindIndex() === TextureBindIndex.Default) {
            this.getGL().framebufferDefaultTexture2D(texture.getTextureIndex());
        } else if (texture.getBindIndex() === TextureBindIndex.Reflect) {
            this.getGL().framebufferReflectTexture2D(texture.getTextureIndex());
        } else {
            throw new Error("attach Not implemented");
        }
        this.unbind();
    }
    getGL() {
        if (this.rc === undefined) {
            throw new Error("BaseFrameBufferObject is not initialized.");
        }
        return this.rc;
    }
    getFBOIndex() {
        if (this.fboIndex === undefined) {
            throw new Error("BaseFrameBufferObject is not initialized.");
        }
        return this.fboIndex;
    }

}