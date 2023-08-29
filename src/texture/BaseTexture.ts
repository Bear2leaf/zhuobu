import RenderingContext from "../contextobject/RenderingContext.js";
import Texture, { TextureIndex } from "./Texture.js";

export default class BaseTexture implements Texture {
  private rc?: RenderingContext;
  private textureIndex?: number;
  private bindIndex: TextureIndex = TextureIndex.Default;
  create(rc: RenderingContext) {
    this.rc = rc;
    this.textureIndex = this.rc.createTexture();
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
  getGL() {
    if (this.rc === undefined) {
      throw new Error("BaseTexture is not initialized.");
    }
    return this.rc;
  }
  generate(width: number, height: number, data?: HTMLImageElement | Float32Array) {
    const rc = this.getGL();
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
    const rc = this.getGL();
    rc.activeTexture(this.bindIndex)
    rc.bindTexture(this.textureIndex);
  }
}