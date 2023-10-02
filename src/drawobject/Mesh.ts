import DrawObject from "./DrawObject.js";
import { ArrayBufferIndex } from "../contextobject/RenderingContext.js";
import GLTF from "../gltf/GLTF.js";
import Node from "../component/Node.js";
import { Vec3, Vec4, flatten } from "../geometry/Vector.js";

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
    // todo - now all meshes rebuild WireframeMeshData with more attribute data
    //        we need to refactor this for better performance.
    setWireframeMeshData(indices: Uint16Array, position: Float32Array, normal: Float32Array) {
        const aPosition: Vec3[] = new Array(indices.length);
        const aNormal: Vec3[] = new Array(indices.length);
        const aBarycentrics: Vec3[] = new Array(indices.length);
        const newIndices = new Uint16Array(indices.length);
        let indexMax = 0;
        indices.forEach((index, j) => {
            aPosition[j] = new Vec3(position[3 * index], position[3 * index + 1], position[3 * index + 2]);
            aNormal[j] = new Vec3(normal[3 * index], normal[3 * index + 1], normal[3 * index + 2]);
            aBarycentrics[j] = new Vec3(j % 3 === 0 ? 1 : 0, j % 3 === 1 ? 1 : 0, j % 3 === 2 ? 1 : 0);
            newIndices[j] = j;
            if (indexMax < newIndices[j]) {
                indexMax = newIndices[j];
            }
        });
        this.updateEBO(newIndices);
        this.createABO(ArrayBufferIndex.Position, flatten(aPosition), 3);
        this.createABO(ArrayBufferIndex.Normal, flatten(aNormal), 3);
        this.createABO(ArrayBufferIndex.Barycentric, flatten(aBarycentrics), 3);
    }
    setMeshData(indices: Uint16Array, position: Float32Array, normal: Float32Array) {
        this.updateEBO(indices);
        this.createABO(ArrayBufferIndex.Position, position, 3);
        this.createABO(ArrayBufferIndex.Normal, normal, 3);
    }
    update(): void {
        this.getEntity().get(Node).updateWorldMatrix()
    }
    draw(mode: number): void {
        super.bind();
        super.draw(mode);
    }
}