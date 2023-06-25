export default class GLTFBufferView {
    private readonly buffer: number;
    private readonly byteOffset: number;
    private readonly byteLength: number;
    private readonly target: number;
    constructor(bufferView: GLTFBufferView) {
        this.buffer = bufferView.buffer;
        this.byteOffset = bufferView.byteOffset;
        this.byteLength = bufferView.byteLength;
        this.target = bufferView.target;
    }
    getBuffer(): number {
        return this.buffer;
    }
    getByteOffset(): number {
        return this.byteOffset;
    }
    getByteLength(): number {
        return this.byteLength;
    }
    getTarget(): number {
        return this.target;
    }


}