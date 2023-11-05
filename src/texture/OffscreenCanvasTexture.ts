import RenderingContext from "../renderingcontext/RenderingContext.js";
import Texture, { TextureIndex } from "./Texture.js";

export default class OffscreenCanvasTexture implements Texture {
  private canvasContext?: RenderingContext;
  private glContext?: RenderingContext;
  private textureIndex?: number;
  private bindIndex: TextureIndex = TextureIndex.OffscreenCanvas;
  create(rc: RenderingContext) {
    this.glContext = rc;
    this.textureIndex = this.getGLRenderingContext().createTexture();

  }
  setCanvasContext(canvasContext: RenderingContext) {
    this.canvasContext = canvasContext;
  }
  setBindIndex(bindIndex: TextureIndex) {
    this.bindIndex = bindIndex;
  }
  getTextureIndex() {
    if (this.textureIndex === undefined) {
      throw new Error("OffscreenCanvas is not initialized.");
    }
    return this.textureIndex;
  }
  getBindIndex() {
    return this.bindIndex;
  }
  getGLRenderingContext() {
    if (this.glContext === undefined) {
      throw new Error("OffscreenCanvas is not initialized.");
    }
    return this.glContext;
  
  }
  getCanvasRenderingContext() {
    if (this.canvasContext === undefined) {
      throw new Error("OffscreenCanvas is not initialized.");
    }
    return this.canvasContext;
  }
  generate(width: number, height: number, data?: HTMLImageElement | Float32Array) {
    const glRC = this.getGLRenderingContext();
    const canvasRC = this.getCanvasRenderingContext();
    glRC.bindTexture(this.textureIndex);
    glRC.texImage2D_RGBA_RGBA_Image(canvasRC.getImageData());
    glRC.bindTexture();
  }
  

  bind() {
    const rc = this.getGLRenderingContext();
    rc.activeTexture(this.bindIndex)
    rc.bindTexture(this.textureIndex);
  }
}