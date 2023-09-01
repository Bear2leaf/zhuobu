import RenderingContext from "../contextobject/RenderingContext.js";

export enum TextureIndex {
  Default = 0,
  Joint = 1,
  Depth = 2,
  Pick = 3,
  Render = 4,
}
export default interface Texture {
  generate(width: number, height: number, data?: HTMLImageElement | Float32Array): void;
  bind(): void;
  create(rc: RenderingContext): void;
}