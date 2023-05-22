import { Vec4, flatten } from "../math/Vector.js";
import Node from "../structure/Node.js";
import Texture from "../texture/Texture.js";
import { ArrayBufferIndex } from "./ArrayBufferObject.js";
import DrawObject from "./DrawObject.js";

export default class Mesh extends DrawObject {
    constructor(gl: WebGL2RenderingContext, texture: Texture, position: Float32Array, normal: Float32Array,  indices: Uint16Array) {
        super(gl, texture, new Map(), indices.length);
        this.updateEBO(indices);
        this.createABO(ArrayBufferIndex.Position, position, 3);
        this.createABO(ArrayBufferIndex.Normal, normal, 3);
    }
    draw(mode: number): void {
        this.bind()
        super.draw(mode);
    }
    update(): void {
    }
}