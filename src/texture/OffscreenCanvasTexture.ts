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
  generate(data?: ImageData | HTMLImageElement | Float32Array, width: number = 1, height: number = 1) {
    const glRC = this.getContext();
    glRC.bindTexture(this.getTextureIndex());
    if (data instanceof ImageData) {
      glRC.texImage2D_RGBA_RGBA_Image(data);
    } else {
      throw new Error("unspport image format");
    }
    glRC.bindTexture();
  }

  bind() {
    const rc = this.getContext();
    rc.activeTexture(this.getBindIndex())
    rc.bindTexture(this.getTextureIndex());
  }
}