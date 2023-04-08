import { device } from "../Device.js";

export default class ArrayBufferObject {
    private readonly bufferObject: WebGLBuffer;
    private readonly elementBufferObject: WebGLBuffer;
    constructor(gl: WebGL2RenderingContext, index: number, arrays: Float32Array, indices: Uint16Array) {
        const bufferObject = gl.createBuffer();
        const elementBufferObject = gl.createBuffer();
        if (!bufferObject || !elementBufferObject) {
            throw new Error("bufferObject or elementBufferObject is undefined");
        }

        this.bufferObject = bufferObject;
        this.elementBufferObject = elementBufferObject;
        this.bind();
        device.gl.bufferData(device.gl.ARRAY_BUFFER, arrays, device.gl.STATIC_DRAW);
        device.gl.bufferData(device.gl.ELEMENT_ARRAY_BUFFER, indices, device.gl.STATIC_DRAW)
        device.gl.enableVertexAttribArray(index);
        device.gl.vertexAttribPointer(index, 4, device.gl.FLOAT, false, 0, 0);
    }
    updateArrayBuffer(arrays: Float32Array) {
        this.bind();
        device.gl.bufferData(device.gl.ARRAY_BUFFER, arrays, device.gl.STATIC_DRAW);
    }
    updateIndices(indices: Uint16Array) {
        this.bind();
        device.gl.bufferData(device.gl.ELEMENT_ARRAY_BUFFER, indices, device.gl.STATIC_DRAW);
    }
    bind() {
        device.gl.bindBuffer(device.gl.ARRAY_BUFFER, this.bufferObject);
        device.gl.bindBuffer(device.gl.ELEMENT_ARRAY_BUFFER, this.elementBufferObject);
    }
}