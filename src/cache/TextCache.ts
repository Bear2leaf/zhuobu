import Device from "../device/Device.js";
import CacheManager from "../manager/CacheManager.js";
import Cache from "./Cache.js";

export default class TextCache implements Cache<string> {
    private readonly device: Device = this.cacheManager.getDevice();
    private readonly cache: Map<string, string> = new Map();
    constructor(private readonly cacheManager: CacheManager) {
    }
    async load(name: string): Promise<void> {
        this.cache.set(name, await this.device.readText(name))
    }
    get(name: string): string {
        const text = this.cache.get(name);
        if (text === undefined) throw new Error(`TextCache ${name} not found`);
        return text;

    }

}