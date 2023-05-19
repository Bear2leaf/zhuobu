import Node from "../structure/Node.js";
import Texture from "../texture/Texture.js";
import { ArrayBufferIndex } from "./ArrayBufferObject.js";
import DrawObject from "./DrawObject.js";

export default class Mesh extends DrawObject {
    constructor(gl: WebGL2RenderingContext, texture: Texture, vertices: Float32Array, normals: Float32Array,  indices: Uint16Array, node: Node) {
        super(gl, texture, node, new Map(), indices.length);
        this.createABO(ArrayBufferIndex.Vertices, vertices, 3);
        this.createABO(ArrayBufferIndex.Normals, normals, 3);
        this.updateEBO(indices);
    }
    draw(mode: number): void {
        this.getNode().updateWorldMatrix()
        super.draw(mode);
    }
}