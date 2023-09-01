import RenderingContext from "../contextobject/RenderingContext.js";
import BaseTexture from "../texture/BaseTexture.js";
import { TextureIndex } from "../texture/Texture.js";
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
    bindPick(): void {
        this.getGL().bindPickReadFramebuffer(this.getFBOIndex());
    }
    unbind(): void {
        this.getGL().bindFramebuffer();
    }
    unbindPick(): void {
        this.getGL().bindPickReadFramebuffer();
    }
    attach(texture: BaseTexture): void {
        this.bind();
        if (texture.getBindIndex() === TextureIndex.Depth) {
            this.getGL().framebufferDepthTexture2D(texture.getTextureIndex());
        } else if (texture.getBindIndex() === TextureIndex.Pick) {
            this.getGL().framebufferPickTexture2D(texture.getTextureIndex());
        }  else if (texture.getBindIndex() === TextureIndex.Render) {
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