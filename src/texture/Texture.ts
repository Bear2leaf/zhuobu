import Device from "../device/Device.js";
import CacheManager from "../manager/CacheManager.js";
import SceneManager from "../manager/SceneManager.js";

export enum TextureIndex {
  Default = 0,
  Joint = 1,
  Depth = 2,
  Pick = 3,
  Render = 4,
  OffscreenCanvas = 5,
}
export default abstract class Texture {
  private device?: Device;
  private sceneManager?: SceneManager;
  private cacheManager?: CacheManager;
  setDevice(device: Device): void {
    this.device = device;
  };
  setSceneManager(sceneManager: SceneManager): void {
    this.sceneManager = sceneManager;
  };
  setCacheManager(cacheManager: CacheManager): void {
    this.cacheManager = cacheManager;
  };
  getDevice() {
    if (this.device === undefined) {
      throw new Error("Texture is not initialized.");
    }
    return this.device;
  };
  getSceneManager() {
    if (this.sceneManager === undefined) {
      throw new Error("Texture is not initialized.");
    }
    return this.sceneManager;
  };
  getCacheManager() {
    if (this.cacheManager === undefined) {
      throw new Error("Texture is not initialized.");
    }
    return this.cacheManager;
  };
  abstract init(): void;
  abstract generate(width: number, height: number, data?: HTMLImageElement | Float32Array): void;
  abstract bind(): void;
}