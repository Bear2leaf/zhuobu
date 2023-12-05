import Device from "../device/Device.js";
import RenderingContext from "../renderingcontext/RenderingContext.js";
import Texture, { TextureBindIndex } from "./Texture.js";

export default class OffscreenCanvasTexture extends Texture {
  private canvasContext?: RenderingContext;
  setDevice(device: Device): void {
    this.setContext(device.getRenderingContext());
    this.setCanvasContext(device.getSDFCanvasRenderingContext());
    this.setTextureIndex(this.getContext().createTexture());
    this.setBindIndex(TextureBindIndex.OffscreenCanvas);
  }
  setCanvasContext(canvasContext: RenderingContext) {
    this.canvasContext = canvasContext;
  }
  getCanvasRenderingContext() {
    if (this.canvasContext === undefined) {
      throw new Error("OffscreenCanvas is not initialized.");
    }
    return this.canvasContext;
  }
  generate(width: number, height: number, data?: HTMLImageElement | Float32Array) {
    const glRC = this.getContext();
    const canvasRC = this.getCanvasRenderingContext();
    // todo update size
    // canvasRC.updateSize(width, height);
    glRC.bindTexture(this.getTextureIndex());
    glRC.texImage2D_RGBA_RGBA_Image(canvasRC.getImageData(0, 0, width, height));
    glRC.bindTexture();
  }

  bind() {
    const rc = this.getContext();
    rc.activeTexture(this.getBindIndex())
    rc.bindTexture(this.getTextureIndex());
  }
}