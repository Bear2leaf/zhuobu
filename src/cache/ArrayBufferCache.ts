import Cache from "./Cache.js";

export default class ArrayBufferCache extends Cache<ArrayBuffer> {
    private readonly cache: Map<string, ArrayBuffer> = new Map();
    async load(name: string): Promise<void> {
        this.cache.set(`${name}`, await this.getDevice().readBuffer(`${name}`))
    }
    get(name: string): ArrayBuffer {
        const buffer = this.cache.get(`${name}`);
        if (buffer === undefined) throw new Error(`ArrayBufferCache ${name} not found`);
        return buffer;

    }

}