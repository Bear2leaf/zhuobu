import Device from "../device/Device.js";
import RenderingContext from "../renderingcontext/RenderingContext.js";

export enum TextureBindIndex {
  Default = 0,
  Joint = 1,
  Depth = 2,
  Pick = 3,
  Render = 4,
  OffscreenCanvas = 5,
}
export default abstract class Texture {
  private textureIndex?: number;
  private bindIndex: TextureBindIndex = TextureBindIndex.Default;
  private rc?: RenderingContext;
  getContext() {
    if (this.rc === undefined) {
      throw new Error("BaseTexture is not initialized.");
    }
    return this.rc;
  }
  setContext(rc: RenderingContext) {
    this.rc = rc;
  }
  setBindIndex(bindIndex: TextureBindIndex) {
    this.bindIndex = bindIndex;
  }
  setTextureIndex(textureIndex: number) {
    this.textureIndex = textureIndex;
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
  abstract setDevice(device: Device): void;
  abstract generate(width: number, height: number, data?: HTMLImageElement | Float32Array): void;
  abstract bind(): void;
}