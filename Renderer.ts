import { gl } from "./global.js";
import Shader, { DemoRedShader as RedPointShader, DemoShader } from "./Shader.js";
import { Vec2 } from "./Vector.js";
import { flatten, Vertices } from "./Vertices.js";


export default class Renderer {
    private readonly vao: WebGLVertexArrayObject | null;
    private readonly vbo: WebGLBuffer | null;
    private readonly shader: Shader;
    constructor(shader: Shader) {
        this.shader = shader;
        this.vao = gl.createVertexArray();
        this.vbo = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo);
        gl.bindVertexArray(this.vao);
    }
    render() {
        this.shader.useAndGetProgram();
    }
}
export class DemoRenderer extends Renderer {
    constructor() {
        super(new DemoShader())
    }
    render(): void {
        super.render()
        gl.clearColor(0, 0, 0, 1)
        gl.clear(gl.COLOR_BUFFER_BIT)
        gl.enableVertexAttribArray(0);
        gl.vertexAttribPointer(0, 4, gl.FLOAT, false, 0, 0);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
            -0.5, -0.5, 0, 1,
            0.5, -0.5, 0, 1,
            0, 0.5, 0, 1
        ]), gl.STATIC_DRAW);
        gl.drawArrays(gl.TRIANGLES, 0, 3)
    }
}
export class GasketRenderer extends Renderer {
    constructor() {
        super(new RedPointShader())
    }
    render(): void {
        super.render()
        const numPositions = 5000;
        const vertices: Vertices = [
            new Vec2(-1.0, -1.0),
            new Vec2(0.0, 1.0),
            new Vec2(1.0, -1.0),
        ];
        vertices.forEach(vec => vec.w = 1);
        const positions: Vertices = [];
        const u = vertices[0].clone().lerp(vertices[1], 0.5);
        const v = vertices[0].clone().lerp(vertices[2], 0.5);
        const p = u.clone().lerp(v, 0.5);
        positions.push(p);
        for (let index = 0; index < numPositions - 1; index++) {
            const j = Math.floor(Math.random() * 3);
            positions.push(positions[index].clone().lerp(vertices[j], 0.5))
        }
        gl.enableVertexAttribArray(0);
        gl.vertexAttribPointer(0, 4, gl.FLOAT, false, 0, 0);
        gl.bufferData(gl.ARRAY_BUFFER, flatten(positions), gl.STATIC_DRAW);
        gl.drawArrays(gl.POINTS, 0, positions.length)
    }
}