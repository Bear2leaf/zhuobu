import { Vec2 } from "../math/Vector.js";

export enum TextureIndex {
  Default = 0,
  Joint = 1,
}
export default interface Texture {
  generate(width: number, height: number, data: HTMLImageElement | Float32Array | undefined): void;
  getSize(): Vec2;
  bind(): void;
}