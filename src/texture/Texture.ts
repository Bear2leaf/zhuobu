import RenderingContext from "../renderingcontext/RenderingContext.js";

export enum TextureBindIndex {
  Default = 0,
  Pick = 0,
  Render = 1,
  OffscreenCanvas = 1,
  Reflect = 2,
  WaterDistortion = 3,
  WaterNormal = 4,
  Skybox = 5,
  Joint = 6,
  Depth = 7,
}

export type SkyboxArray = readonly [
  HTMLImageElement
  , HTMLImageElement
  , HTMLImageElement
  , HTMLImageElement
  , HTMLImageElement
  , HTMLImageElement
];

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
    this.setTextureIndex(this.getContext().createTexture());
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
  abstract generate(data?: ImageData | HTMLImageElement | SkyboxArray | Float32Array, width?: number, height?: number): void;
  abstract bind(): void;
}