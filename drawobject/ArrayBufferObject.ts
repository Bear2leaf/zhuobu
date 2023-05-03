import device from "../device/Device.js";
export enum ArrayBufferIndex {
    Vertices = 0,
    Colors = 1,
    TextureCoords = 2,
    Normals = 3,
}
export default class ArrayBufferObject {
    private readonly bufferObject: WebGLBuffer;
    constructor(index: ArrayBufferIndex, arrays: Float32Array, size: number) {
        const bufferObject = device.gl.createBuffer();
        if (!bufferObject) {
            throw new Error("bufferObject is undefined");
        }
        this.bufferObject = bufferObject;
        this.update(arrays);
        device.gl.enableVertexAttribArray(index);
        device.gl.vertexAttribPointer(index, size, device.gl.FLOAT, false, 0, 0);
    }
    update(arrays: Float32Array) {
        device.gl.bindBuffer(device.gl.ARRAY_BUFFER, this.bufferObject);
        device.gl.bufferData(device.gl.ARRAY_BUFFER, arrays, device.gl.STATIC_DRAW);
    }
}