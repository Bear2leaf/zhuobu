import RenderingContext from "../renderingcontext/RenderingContext.js";
import Texture, { TextureBindIndex } from "../texture/Texture.js";
import FrameBufferObject from "./FrameBufferObject.js";

export default class BaseFrameBufferObject implements FrameBufferObject {
    private rc?: RenderingContext;
    private fboIndex?: number;
    private texture?: Texture;

    getTexture() {
        if (this.texture === undefined) {
            throw new Error("BaseFrameBufferObject is not initialized.");
        }
        return this.texture;
    }
    create(rc: RenderingContext) {
        this.rc = rc;
        this.fboIndex = this.rc.createFramebuffer();
    }
    bind(): void {
        this.getTexture().bind();
        this.getGL().bindFramebuffer(this.getFBOIndex());
    }
    bindPick(): void {
        this.getTexture().bind();
        this.getGL().bindPickReadFramebuffer(this.getFBOIndex());
    }
    unbind(): void {
        this.getGL().bindFramebuffer();
    }
    unbindPick(): void {
        this.getGL().bindPickReadFramebuffer();
    }
    attach(texture: Texture): void {
        this.texture = texture;;
        this.bind();
        if (texture.getBindIndex() === TextureBindIndex.Depth) {
            this.getGL().framebufferDepthTexture2D(texture.getTextureIndex());
        } else if (texture.getBindIndex() === TextureBindIndex.Pick) {
            this.getGL().framebufferPickTexture2D(texture.getTextureIndex());
        }  else if (texture.getBindIndex() === TextureBindIndex.Render) {
            this.getGL().framebufferRenderTexture2D(texture.getTextureIndex());
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