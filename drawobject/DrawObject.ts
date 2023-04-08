import Matrix from "../math/Matrix.js";
import { device } from "../Device.js";
import { flatten, Vec4 } from "../math/Vector.js";
import ArrayBufferObject from "./ArrayBufferObject.js";
import { ArrayBufferIndex } from "./ArrayBufferIndex.js";


export default class DrawObject {
    readonly vao: WebGLVertexArrayObject | null;
    readonly aboMap: Map<ArrayBufferIndex, ArrayBufferObject>;
    readonly worldMatrix: Matrix;
    count: number;
    constructor(colors: Vec4[], indices: number[], vertices: Vec4[]) {
        this.count = indices.length;
        this.aboMap = new Map();
        this.vao = device.gl.createVertexArray();
        device.gl.bindVertexArray(this.vao);
        this.worldMatrix = Matrix.identity();
        this.aboMap.set(ArrayBufferIndex.Vertices, new ArrayBufferObject(device.gl, ArrayBufferIndex.Vertices, flatten(vertices), new Uint16Array(indices)))
        this.aboMap.set(ArrayBufferIndex.Colors, new ArrayBufferObject(device.gl, ArrayBufferIndex.Colors, flatten(colors), new Uint16Array(indices)))
    }
    draw(mode: number) {
        this.aboMap.forEach((arrayBufferObject) => {
            arrayBufferObject.bind();
        })
        device.gl.drawElements(mode, this.count, device.gl.UNSIGNED_SHORT, 0)

    }
}