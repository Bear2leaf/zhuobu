import RenderingContext from "../renderingcontext/RenderingContext.js";
import Texture from "./Texture.js";

export default class OffscreenCanvasTexture extends Texture {
  private canvasContext?: RenderingContext;
  setCanvasContext(canvasContext: RenderingContext) {
    this.canvasContext = canvasContext;
  }
  getCanvasRenderingContext() {
    if (this.canvasContext === undefined) {
      throw new Error("OffscreenCanvas is not initialized.");
    }
    return this.canvasContext;
  }
  generate(data?: HTMLImageElement, width: number = 1, height: number = 1) {
    if (!data) {
      throw new Error("OffscreenCanvasTexture.generate: data is undefined");
    }
    const glRC = this.getContext();
    glRC.bindTexture(this.getTextureIndex());
    glRC.texImage2D_RGBA_RGBA_Image(data);
    glRC.bindTexture();
  }

  bind() {
    const rc = this.getContext();
    rc.activeTexture(this.getBindIndex())
    rc.bindTexture(this.getTextureIndex());
  }
}