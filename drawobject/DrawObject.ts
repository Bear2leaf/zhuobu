import Matrix from "../math/Matrix.js";
import { device } from "../Device.js";
import { flatten, Vec4 } from "../math/Vector.js";

export default class DrawObject {
    private buffered: boolean = false;
    readonly colors: Vec4[];
    readonly indices: number[];
    readonly vertices: Vec4[];
    readonly vao: WebGLVertexArrayObject | null;
    readonly vbo: WebGLBuffer | null;
    readonly ebo: WebGLBuffer | null;
    readonly worldMatrix: Matrix;
    constructor(colors: Vec4[], indices: number[], vertices: Vec4[]) {
        this.colors = colors;
        this.indices = indices;
        this.vertices = vertices;
        this.vao = device.gl.createVertexArray();
        this.ebo = device.gl.createBuffer();
        this.vbo = device.gl.createBuffer();
        this.worldMatrix = Matrix.identity();
    }
    draw(mode: number) {
        if (!this.buffered) {
            this.buffered = true;
            device.gl.bindBuffer(device.gl.ARRAY_BUFFER, this.vbo)
            device.gl.bindBuffer(device.gl.ELEMENT_ARRAY_BUFFER, this.ebo)
            device.gl.bufferData(device.gl.ARRAY_BUFFER, flatten([...this.vertices, ...this.colors]), device.gl.STATIC_DRAW);
            device.gl.bufferData(device.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indices), device.gl.STATIC_DRAW)
            
            device.gl.enableVertexAttribArray(0);
            device.gl.vertexAttribPointer(0, 4, device.gl.FLOAT, false, 0, 0);
            device.gl.enableVertexAttribArray(1);
            device.gl.vertexAttribPointer(1, 4, device.gl.FLOAT, false, 0, this.vertices.length * 4 * 4);
        }
        device.gl.drawElements(mode, this.indices.length, device.gl.UNSIGNED_SHORT, 0)

    }
}