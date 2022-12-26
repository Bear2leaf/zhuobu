import ready, { gl } from "./global.js";
import { DemoShader } from "./Shader.js";
ready(() => {
    const shader = new DemoShader();
    shader.useAndGetProgram();
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
    gl.drawArrays(gl.TRIANGLES, 0, 3);
});
//# sourceMappingURL=game.js.map