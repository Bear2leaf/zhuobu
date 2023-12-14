import UniformBufferObject from "./UniformBufferObject.js";
export default class GLUniformBufferObject implements UniformBufferObject {
    private readonly buffer: WebGLBuffer;
    private readonly gl: WebGL2RenderingContext;
    private readonly index: number;
    constructor(gl: WebGL2RenderingContext, index: number) {
        this.gl = gl;
        this.index = index;
        const bufferObject = this.gl.createBuffer();
        if (!bufferObject) {
            throw new Error("bufferObject is undefined");
        }
        this.buffer = bufferObject;
    }
    updateBuffer(arrays: Float32Array) {
        this.gl.bindBuffer(this.gl.UNIFORM_BUFFER, this.buffer);
        this.gl.bufferData(this.gl.UNIFORM_BUFFER, arrays, this.gl.STATIC_DRAW);
        this.gl.bindBuffer(this.gl.UNIFORM_BUFFER, null);
    }
    bind(): void {
        this.gl.bindBufferBase(this.gl.UNIFORM_BUFFER, this.index, this.buffer)
    }
}