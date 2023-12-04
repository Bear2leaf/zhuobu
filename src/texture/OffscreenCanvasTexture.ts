import RenderingContext from "../renderingcontext/RenderingContext.js";
import Texture, { TextureIndex } from "./Texture.js";

export default class OffscreenCanvasTexture extends Texture {
  private canvasContext?: RenderingContext;
  private glContext?: RenderingContext;
  init(): void {
    this.glContext = this.getDevice().getRenderingContext();
    this.setTextureIndex(this.getGLRenderingContext().createTexture());
    this.setBindIndex(TextureIndex.OffscreenCanvas);
  }
  setCanvasContext(canvasContext: RenderingContext) {
    this.canvasContext = canvasContext;
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
    // todo update size
    // canvasRC.updateSize(width, height);
    glRC.bindTexture(this.getTextureIndex());
    glRC.texImage2D_RGBA_RGBA_Image(canvasRC.getImageData(0, 0, width, height));
    glRC.bindTexture();
  }

  bind() {
    const rc = this.getGLRenderingContext();
    rc.activeTexture(this.getBindIndex())
    rc.bindTexture(this.getTextureIndex());
  }
}