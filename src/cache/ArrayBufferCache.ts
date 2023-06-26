import Device from "../device/Device.js";
import CacheManager from "../manager/CacheManager.js";
import Cache from "./Cache.js";

export default class ArrayBufferCache implements Cache<ArrayBuffer> {
    private readonly device: Device = this.cacheManager.getDevice();
    private readonly cache: Map<string, ArrayBuffer> = new Map();
    constructor(private readonly cacheManager: CacheManager) {
    }
    async load(name: string): Promise<void> {
        this.cache.set(`resource/gltf/${name}.bin`, await this.device.readBuffer(`resource/gltf/${name}.bin`))
    }
    get(name: string): ArrayBuffer {
        const buffer = this.cache.get(`resource/gltf/${name}.bin`);
        if (buffer === undefined) throw new Error(`ArrayBufferCache resource/gltf/${name}.bin not found`);
        return buffer;

    }

}