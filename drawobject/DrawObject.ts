import Matrix from "../math/Matrix.js";
import { device } from "../Device.js";
import ArrayBufferObject from "./ArrayBufferObject.js";
import { ArrayBufferIndex } from "./ArrayBufferObject.js";


export default class DrawObject {
    readonly vao: WebGLVertexArrayObject | null;
    readonly aboMap: Map<ArrayBufferIndex, ArrayBufferObject>;
    readonly worldMatrix: Matrix;
    count: number;
    constructor(aboMap: Map<ArrayBufferIndex, ArrayBufferObject>, count: number) {
        this.count = count;
        this.aboMap = aboMap;
        this.vao = device.gl.createVertexArray();
        device.gl.bindVertexArray(this.vao);
        this.worldMatrix = Matrix.identity();
    }
    draw(mode: number) {
        this.aboMap.forEach((arrayBufferObject) => {
            arrayBufferObject.bind();
        })
        device.gl.drawElements(mode, this.count, device.gl.UNSIGNED_SHORT, 0)

    }
}