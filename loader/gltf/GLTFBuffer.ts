
export default class GLTFBuffer {
    private readonly byteLength: number;
    private readonly uri: string;
    constructor(buffer: GLTFBuffer) {
        this.byteLength = buffer.byteLength;
        this.uri = buffer.uri;
    }
    getBufferData(cache: Map<string, ArrayBuffer>): ArrayBuffer {
        const buffer = cache.get(`static/gltf/${this.uri}`);
        if (!buffer) {
            throw new Error(`Buffer not found: ${this.uri}`);
        }
        return buffer;
    }
}