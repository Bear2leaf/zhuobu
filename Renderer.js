import { gl } from "./global.js";
import { DemoRedShader, DemoShader } from "./Shader.js";
export default class Renderer {
    constructor(shader) {
        this.shader = shader;
    }
    render() {
        this.shader.useAndGetProgram();
    }
}
export class DemoRenderer extends Renderer {
    constructor() {
        super(new DemoShader());
        const vao = gl.createVertexArray();
        const vbo = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
        gl.bindVertexArray(vao);
        gl.enableVertexAttribArray(0);
        gl.vertexAttribPointer(0, 4, gl.FLOAT, false, 0, 0);
    }
    render() {
        super.render();
        gl.clearColor(0, 0, 0, 1);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
            -0.5, -0.5, 0, 1,
            0.5, -0.5, 0, 1,
            0, 0.5, 0, 1
        ]), gl.STATIC_DRAW);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
    }
}
export class DemoRedRenderer extends Renderer {
    constructor() {
        super(new DemoRedShader());
        const vao = gl.createVertexArray();
        const vbo = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
        gl.bindVertexArray(vao);
        gl.enableVertexAttribArray(0);
        gl.vertexAttribPointer(0, 4, gl.FLOAT, false, 0, 0);
    }
    render() {
        super.render();
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
            -0.5, -0.5, 0, 1,
            0.5, -0.5, 0, 1,
            0, -1, 0, 1
        ]), gl.STATIC_DRAW);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
    }
}
//# sourceMappingURL=Renderer.js.map