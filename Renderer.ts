import { gl } from "./global.js";
import Shader, { DemoShader } from "./Shader.js";


export default class Renderer {
    private readonly shader: Shader;
    constructor(shader: Shader) {
        this.shader = shader;
    }
    render() {
        this.shader.useAndGetProgram();
    }
}
export class DemoRenderer extends Renderer {
    constructor() {
        super(new DemoShader())
        const vao = gl.createVertexArray();
        const vbo = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
        gl.bindVertexArray(vao);
        gl.enableVertexAttribArray(0);
        gl.vertexAttribPointer(0, 4, gl.FLOAT, false, 0, 0);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
            -0.5, -0.5, 0, 1,
            0.5, -0.5, 0, 1,
            0, 0.5, 0, 1
        ]), gl.STATIC_DRAW);
    }
    render(): void {
        super.render()
        gl.drawArrays(gl.TRIANGLES, 0, 3)
    }
}