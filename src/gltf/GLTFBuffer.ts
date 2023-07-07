import ArrayBufferCache from "../cache/ArrayBufferCache.js";

export default class GLTFBuffer {
    private readonly byteLength: number;
    private readonly uri: string;
    constructor(buffer: GLTFBuffer) {
        this.byteLength = buffer.byteLength;
        this.uri = buffer.uri;
    }
    getBufferData(cache: ArrayBufferCache): ArrayBuffer {
        const buffer = cache.get(`resource/gltf/${this.uri}`);
        if (!buffer) {
            throw new Error(`Buffer not found: ${this.uri}`);
        }
        return buffer;
    }
}