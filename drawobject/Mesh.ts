import Node from "../structure/Node.js";
import { ArrayBufferIndex } from "./ArrayBufferObject.js";
import DrawObject from "./DrawObject.js";

export default class Mesh extends DrawObject {
    constructor(vertices: Float32Array, normals: Float32Array,  indices: Uint16Array, node: Node) {
        super(node, new Map(), indices.length);
        this.createABO(ArrayBufferIndex.Vertices, vertices, 3);
        this.createABO(ArrayBufferIndex.Normals, normals, 3);
        this.updateEBO(indices);
    }
    draw(mode: number): void {
        this.getNode().updateWorldMatrix()
        super.draw(mode);
    }
}