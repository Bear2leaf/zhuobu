import Cache from "./Cache.js";

export default class ArrayBufferCache extends Cache<ArrayBuffer> {
    private readonly cache: Map<string, ArrayBuffer> = new Map();
    async load(name: string): Promise<void> {
        this.cache.set(`resource/gltf/${name}.bin`, await this.getDevice().readBuffer(`resource/gltf/${name}.bin`))
    }
    get(name: string): ArrayBuffer {
        const buffer = this.cache.get(`resource/gltf/${name}.bin`);
        if (buffer === undefined) throw new Error(`ArrayBufferCache resource/gltf/${name}.bin not found`);
        return buffer;

    }

}