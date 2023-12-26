import RenderingContext from "../renderingcontext/RenderingContext.js";

export enum TextureBindIndex {
  Default = 0,
  Joint = 1,
  Depth = 2,
  Pick = 3,
  Render = 4,
  OffscreenCanvas = 5,
  Skybox = 6,
  Reflect = 7,
  WaterNormal = 8,
  WaterDistortion = 9,
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