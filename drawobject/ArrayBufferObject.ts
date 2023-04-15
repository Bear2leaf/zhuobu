import { device } from "../device/Device.js";
export enum ArrayBufferIndex {
    Vertices = 0,
    Colors = 1,
    TextureCoords = 2,
}
export default class ArrayBufferObject {
    private readonly bufferObject: WebGLBuffer;
    constructor(index: ArrayBufferIndex, arrays: Float32Array) {
        const bufferObject = device.gl.createBuffer();
        if (!bufferObject) {
            throw new Error("bufferObject is undefined");
        }
        this.bufferObject = bufferObject;
        this.update(arrays);
        device.gl.enableVertexAttribArray(index);
        const size = index === ArrayBufferIndex.TextureCoords ? 2 : 4
        device.gl.vertexAttribPointer(index, size, device.gl.FLOAT, false, 0, 0);
    }
    update(arrays: Float32Array) {
        device.gl.bindBuffer(device.gl.ARRAY_BUFFER, this.bufferObject);
        device.gl.bufferData(device.gl.ARRAY_BUFFER, arrays, device.gl.STATIC_DRAW);
    }
}