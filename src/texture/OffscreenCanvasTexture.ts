import RenderingContext from "../renderingcontext/RenderingContext.js";
import Texture, { TextureIndex } from "./Texture.js";

export default class OffscreenCanvasTexture implements Texture {
  private rc?: RenderingContext;
  private textureIndex?: number;
  private bindIndex: TextureIndex = TextureIndex.OffscreenCanvas;
  create(rc: RenderingContext) {
    this.rc = rc;
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
  getRenderingContext() {
    if (this.rc === undefined) {
      throw new Error("BaseTexture is not initialized.");
    }
    return this.rc;
  
  }
  generate(width: number, height: number, data?: HTMLImageElement | Float32Array) {
    throw new Error("Method not implemented.");
  }
  
  getImageData(x: number, y: number) {
    return this.getRenderingContext().readSinglePixel(x, y)
  }

  bind() {
    throw new Error("Method not implemented.");
  }
}