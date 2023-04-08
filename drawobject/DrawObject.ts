import Matrix from "../math/Matrix.js";
import { device } from "../Device.js";
import { flatten, Vec4 } from "../math/Vector.js";
import ArrayBufferObject from "./ArrayBufferObject.js";
import { ArrayBufferIndex } from "./ArrayBufferIndex.js";


export default class DrawObject {
    readonly colors: Vec4[];
    readonly indices: number[];
    readonly vertices: Vec4[];
    readonly vao: WebGLVertexArrayObject | null;
    readonly arrayBufferObjects: ArrayBufferObject[] = [];
    readonly worldMatrix: Matrix;
    constructor(colors: Vec4[], indices: number[], vertices: Vec4[]) {
        this.colors = colors;
        this.indices = indices;
        this.vertices = vertices;
        this.vao = device.gl.createVertexArray();
        device.gl.bindVertexArray(this.vao);
        this.worldMatrix = Matrix.identity();
        this.arrayBufferObjects.push(new ArrayBufferObject(device.gl, ArrayBufferIndex.Vertices, flatten(this.vertices), new Uint16Array(this.indices)))
        this.arrayBufferObjects.push(new ArrayBufferObject(device.gl, ArrayBufferIndex.Colors, flatten(this.colors), new Uint16Array(this.indices)))
    }
    draw(mode: number) {
        this.arrayBufferObjects.forEach((arrayBufferObject) => {
            arrayBufferObject.bind();
        })
        device.gl.drawElements(mode, this.indices.length, device.gl.UNSIGNED_SHORT, 0)

    }
}