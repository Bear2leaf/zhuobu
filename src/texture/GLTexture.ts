import RenderingContext from "../renderingcontext/RenderingContext.js";
import Texture, { TextureIndex } from "./Texture.js";

export default class GLTexture extends Texture {
  private rc?: RenderingContext;
  private textureIndex?: number;
  private bindIndex: TextureIndex = TextureIndex.Default;
  init(): void {
    this.rc = this.getDevice().getRenderingContext();
    this.textureIndex = this.getContext().createTexture();
    const windowInfo = this.getDevice().getWindowInfo();
    this.generate(windowInfo.windowWidth * windowInfo.pixelRatio, windowInfo.windowHeight * windowInfo.pixelRatio)
  }
  setBindIndex(bindIndex: TextureIndex) {
    this.bindIndex = bindIndex;
  }
  getTextureIndex() {
    if (this.textureIndex === undefined) {
      throw new Error("BaseTexture is not initialized.");
    }
    return this.textureIndex;
  }
  getBindIndex() {
    return this.bindIndex;
  }
  getContext() {
    if (this.rc === undefined) {
      throw new Error("BaseTexture is not initialized.");
    }
    return this.rc;
  }
  generate(width: number, height: number, data?: HTMLImageElement | Float32Array) {
    const rc = this.getContext();
    rc.bindTexture(this.textureIndex);
    if (data === undefined) {
      if (this.bindIndex === TextureIndex.Depth) {
        rc.texImage2D_DEPTH24_UINT_NULL(width, height);
      } else {
        rc.texImage2D_RGBA_RGBA_NULL(width, height);
      }
    } else if (data instanceof Float32Array) {
      rc.texImage2D_RGBA32F_RGBA_FLOAT(width, height, data);
    } else {
      rc.texImage2D_RGBA_RGBA_Image(data);
    }
    rc.bindTexture();
  }
  bind() {
    const rc = this.getContext();
    rc.activeTexture(this.bindIndex)
    rc.bindTexture(this.textureIndex);
  }
}