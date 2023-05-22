export enum ArrayBufferIndex {
    Position = 0,
    Color = 1,
    TextureCoord = 2,
    Normal = 3,
    Weights = 4,
    Joints = 5,
}
export default class ArrayBufferObject {
    private readonly bufferObject: WebGLBuffer;
    private readonly gl: WebGL2RenderingContext;
    constructor(gl: WebGL2RenderingContext, index: ArrayBufferIndex, arrays: Float32Array | Uint16Array, size: number) {
        this.gl = gl;
        const bufferObject = this.gl.createBuffer();
        if (!bufferObject) {
            throw new Error("bufferObject is undefined");
        }
        this.bufferObject = bufferObject;
        this.update(arrays);
        this.gl.enableVertexAttribArray(index);
        if (arrays instanceof Float32Array) {
            this.gl.vertexAttribPointer(index, size, this.gl.FLOAT, false, 0, 0);
        } else if (arrays instanceof Uint16Array) {
            this.gl.vertexAttribIPointer(index, size, this.gl.UNSIGNED_SHORT, 0, 0);
        }
    }
    update(arrays: Float32Array | Uint16Array) {
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.bufferObject);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, arrays, this.gl.STATIC_DRAW);
    }
}