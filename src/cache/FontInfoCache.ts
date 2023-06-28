import Device from "../device/Device.js";
import CacheManager from "../manager/CacheManager.js";
import Cache from "./Cache.js";

export default class JSONCache extends Cache<Object> {
    private readonly device: Device = this.cacheManager.getDevice();
    private readonly cache: Map<string, Object> = new Map();
    constructor(private readonly cacheManager: CacheManager) {
        super();
    }
    async load(name: string): Promise<void> {
        this.cache.set(name, await this.device.readJson(`${name}`))
    }
    get(name: string): Object {
        const json = this.cache.get(`${name}`);
        if (json === undefined) throw new Error(`JSONCache ${name} not found`);
        return json;

    }

}