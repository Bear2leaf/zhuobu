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
  generate(data: HTMLImageElement) {
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
  active() {
      const rc = this.getContext();
      rc.activeTexture(this.getBindIndex())
  }
  deactive() {
      const rc = this.getContext();
      rc.activeTexture(0)
  }
}