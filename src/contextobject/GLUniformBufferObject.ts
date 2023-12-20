import { UniformBinding } from "../renderingcontext/RenderingContext.js";
import UniformBufferObject from "./UniformBufferObject.js";
export default class GLUniformBufferObject implements UniformBufferObject {
    private readonly buffer: WebGLBuffer;
    private readonly gl: WebGL2RenderingContext;
    private oldBuffer?: Float32Array;
    constructor(gl: WebGL2RenderingContext) {
        this.gl = gl;
        const bufferObject = this.gl.createBuffer();
        if (!bufferObject) {
            throw new Error("bufferObject is undefined");
        }
        this.buffer = bufferObject;
    }
    bufferEquals(arrays: Float32Array) {
        const oldBuffer = this.oldBuffer;
        this.oldBuffer = arrays;
        if (oldBuffer === undefined) {
            return false;
        }
        if (oldBuffer.length !== arrays.length) {
            return false;
        }
        for (let i = 0; i < oldBuffer.length; i++) {
            if (oldBuffer[i] !== arrays[i]) {
                return false;
            }
        }
        return true;
    }
    updateBuffer(arrays: Float32Array) {
        if (this.bufferEquals(arrays)) {
            return;
        }
        this.gl.bindBuffer(this.gl.UNIFORM_BUFFER, this.buffer);
        this.gl.bufferData(this.gl.UNIFORM_BUFFER, arrays, this.gl.STATIC_DRAW);
        this.gl.bindBuffer(this.gl.UNIFORM_BUFFER, null);
    }
    bind(index: UniformBinding): void {
        this.gl.bindBufferBase(this.gl.UNIFORM_BUFFER, index, this.buffer)
    }
}