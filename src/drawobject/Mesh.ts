import DrawObject from "./DrawObject.js";
import { ArrayBufferIndex } from "../renderingcontext/RenderingContext.js";
import GLTF from "../gltf/GLTF.js";
import Node from "../component/Node.js";

export default class Mesh extends DrawObject {
    private gltf?: GLTF;
    private nodeIndex?: number;
    setNodeIndex(nodeIndex: number) {
        this.nodeIndex = nodeIndex;
    }
    init() {
        super.init();
        this.getGLTF().buildMesh(this.getEntity(), this.nodeIndex);
    }
    setGLTF(gltf: GLTF) {
        this.gltf = gltf;
    }
    getGLTF() {
        if (!this.gltf) {
            throw new Error("gltf is not set");
        }
        return this.gltf;
    }
    setMeshData(indices: Uint16Array, position: Float32Array, normal: Float32Array) {
        this.updateEBO(indices);
        this.createABO(ArrayBufferIndex.Position, position, 3);
        this.createABO(ArrayBufferIndex.Normal, normal, 3);
    }
    draw(mode: number): void {
        this.getEntity().get(Node).updateWorldMatrix();
        super.bind();
        super.draw(mode);
    }
}