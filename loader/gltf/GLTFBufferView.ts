export default class GLTFBufferView {
    private readonly buffer: number;
    private readonly byteOffset: number;
    private readonly byteLength: number;
    private readonly target: number;
    constructor(buffer: number, byteOffset: number, byteLength: number, target: number) {
        this.buffer = buffer;
        this.byteOffset = byteOffset;
        this.byteLength = byteLength;
        this.target = target;
    }

}