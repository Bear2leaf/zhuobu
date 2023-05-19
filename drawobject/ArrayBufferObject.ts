import device from "../device/Device.js";
export enum ArrayBufferIndex {
    Vertices = 0,
    Colors = 1,
    TextureCoords = 2,
    Normals = 3,
}
export default class ArrayBufferObject {
    private readonly bufferObject: WebGLBuffer;
    private readonly gl: WebGL2RenderingContext;
    constructor(gl:WebGL2RenderingContext, index: ArrayBufferIndex, arrays: Float32Array, size: number) {
        this.gl = gl;
        const bufferObject = this.gl.createBuffer();
        if (!bufferObject) {
            throw new Error("bufferObject is undefined");
        }
        this.bufferObject = bufferObject;
        this.update(arrays);
        this.gl.enableVertexAttribArray(index);
        this.gl.vertexAttribPointer(index, size, this.gl.FLOAT, false, 0, 0);
    }
    update(arrays: Float32Array) {
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.bufferObject);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, arrays, this.gl.STATIC_DRAW);
    }
}