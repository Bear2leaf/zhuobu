import VertexArrayObject from "./VertexArrayObject.js";

export default class GLVertexArrayObject implements VertexArrayObject {
    private readonly vao: WebGLVertexArrayObject;
    private readonly gl: WebGL2RenderingContext;
    constructor(gl: WebGL2RenderingContext) {
        this.gl = gl;
        const vao = gl.createVertexArray();
        if (!vao) {
            throw new Error("vao created failed");
        }
        this.vao = vao;
    }
    bind(): void {
        this.gl.bindVertexArray(this.vao);
    }
}