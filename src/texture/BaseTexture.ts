import RenderingContext from "../renderingcontext/RenderingContext.js";
import Texture, { TextureIndex } from "./Texture.js";

export default class BaseTexture implements Texture {
  private gl?: RenderingContext;
  private textureIndex?: number;
  private bindIndex: TextureIndex = TextureIndex.Default;
  create(gl: RenderingContext) {
    this.gl = gl;
    this.textureIndex = this.gl.createTexture();
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
  getGL() {
    if (this.gl === undefined) {
      throw new Error("BaseTexture is not initialized.");
    }
    return this.gl;
  }
  generate(width: number, height: number, data?: HTMLImageElement | Float32Array) {
    const gl = this.getGL();
    gl.bindTexture(this.textureIndex);
    if (data === undefined) {
      if (this.bindIndex === TextureIndex.Depth) {
        gl.texImage2D_DEPTH24_UINT_NULL(width, height);
      } else {
        gl.texImage2D_RGBA_RGBA_NULL(width, height);
      }
    } else if (data instanceof Float32Array) {
      gl.texImage2D_RGBA32F_RGBA_FLOAT(width, height, data);
    } else {
      gl.texImage2D_RGBA_RGBA_Image(data);
    }
    gl.bindTexture();
  }
  bind() {
    const gl = this.getGL();
    gl.activeTexture(this.bindIndex)
    gl.bindTexture(this.textureIndex);
  }
}