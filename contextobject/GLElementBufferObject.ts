import ArrayBufferObject from "./ArrayBufferObject.js";
export default class GLElementBufferObject implements ArrayBufferObject {
    private readonly bufferObject: WebGLBuffer;
    private readonly gl: WebGL2RenderingContext;
    constructor(gl: WebGL2RenderingContext, arrays: Uint16Array) {
        this.gl = gl;
        const bufferObject = this.gl.createBuffer();
        if (!bufferObject) {
            throw new Error("bufferObject is undefined");
        }
        this.bufferObject = bufferObject;
        this.updateBuffer(arrays);
    }
    updateBuffer(arrays: Uint16Array) {
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.bufferObject);
        this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, arrays, this.gl.STATIC_DRAW);
    }
}