import { device } from "../../device/Device.js";

export default class GLTFBuffer {
    private readonly byteLength: number;
    private readonly uri: string;
    constructor(buffer: GLTFBuffer) {
        this.byteLength = buffer.byteLength;
        this.uri = buffer.uri;
    }
    getBufferData(): ArrayBuffer {
        const buffer = device.getGlbCache().get(`static/gltf/${this.uri}`);
        if (!buffer) {
            throw new Error(`Buffer not found: ${this.uri}`);
        }
        return buffer;
    }
}