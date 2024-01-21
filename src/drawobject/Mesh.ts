import DrawObject from "./DrawObject.js";
import { ArrayBufferIndex } from "../renderingcontext/RenderingContext.js";
import GLTF from "../gltf/GLTF.js";
import Node from "../transform/Node.js";
import { Vec2, Vec3, flatten } from "../geometry/Vector.js";
import GLTFAnimationController from "../controller/GLTFAnimationController.js";

export default class Mesh extends DrawObject {
    private gltf?: GLTF;
    private nodeIndex: number = 0;
    private primitiveIndex: number = 0;
    private animationIndex: number = 0;
    setAnimationIndex(index: number) {
        this.animationIndex = index;
    }
    getAnimationIndex() {
        return this.animationIndex;
    }
    setNodeIndex(index: number) {
        this.nodeIndex = index;
    }
    setPrimitiveIndex(index: number) {
        this.primitiveIndex = index;
    }
    getNodeIndex() {
        return this.nodeIndex;
    }
    getPrimitiveIndex() {
        return this.primitiveIndex;
    }
    initMesh() {
        const gltf = this.getGLTF();
        const entity = this.getEntity();
        const node = gltf.getNodeByIndex(this.nodeIndex);
        entity.set(Node, node.getNode());
        const mesh = gltf.getMeshByIndex(node.getMesh());
        const primitive = mesh.getPrimitiveByIndex(this.primitiveIndex);
        const positionIndex = primitive.getAttributes().getPosition();
        const texcoordIndex = primitive.getAttributes().getTexCoord();
        const normalIndex = primitive.getAttributes().getNormal();
        const indicesIndex = primitive.getIndices();
        this.bind();
        this.setMeshData(
            gltf.getDataByAccessorIndex(indicesIndex) as Uint16Array
            , gltf.getDataByAccessorIndex(positionIndex) as Float32Array
            , gltf.getDataByAccessorIndex(normalIndex) as Float32Array
            , texcoordIndex === undefined ? gltf.getDataByAccessorIndex(positionIndex) as Float32Array : gltf.getDataByAccessorIndex(texcoordIndex) as Float32Array
        );
        if (entity.has(GLTFAnimationController)) {

            const animation = gltf.getAnimationByIndex(this.getAnimationIndex());
            animation.createBuffers(gltf);
            entity.get(GLTFAnimationController).setAnimationData(
                animation
            );
        }
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
    setWireframeMeshData(indices: Uint16Array, position: Float32Array, normal: Float32Array, texcoord: Float32Array) {
        const aPosition: Vec3[] = new Array(indices.length);
        const aNormal: Vec3[] = new Array(indices.length);
        const aTexcoord: Vec3[] = new Array(indices.length);
        const aBarycentrics: Vec3[] = new Array(indices.length);
        const newIndices = new Uint16Array(indices.length);
        let indexMax = 0;
        indices.forEach((index, j) => {
            aPosition[j] = new Vec3(position[3 * index], position[3 * index + 1], position[3 * index + 2]);
            aNormal[j] = new Vec3(normal[3 * index], normal[3 * index + 1], normal[3 * index + 2]);
            aTexcoord[j] = new Vec2(texcoord[2 * index], texcoord[2 * index + 1]);
            aBarycentrics[j] = new Vec3(j % 3 === 0 ? 1 : 0, j % 3 === 1 ? 1 : 0, j % 3 === 2 ? 1 : 0);
            newIndices[j] = j;
            if (indexMax < newIndices[j]) {
                indexMax = newIndices[j];
            }
        });
        this.updateEBO(newIndices);
        this.createABO(ArrayBufferIndex.Position, flatten(aPosition), 3);
        this.createABO(ArrayBufferIndex.TextureCoord, flatten(aTexcoord), 2);
        this.createABO(ArrayBufferIndex.Normal, flatten(aNormal), 3);
        this.createABO(ArrayBufferIndex.Barycentric, flatten(aBarycentrics), 3);
    }
    setMeshData(indices: Uint16Array, position: Float32Array, normal: Float32Array, texcoord: Float32Array) {
        this.updateEBO(indices);
        this.createABO(ArrayBufferIndex.Position, position, 3);
        this.createABO(ArrayBufferIndex.Normal, normal, 3);
        this.createABO(ArrayBufferIndex.TextureCoord, texcoord, 2);
    }
    update(): void {
        this.getEntity().get(Node).updateWorldMatrix()
    }
    draw(): void {
        this.getRenderingContext().switchBlend(true);
        super.draw();
        this.getRenderingContext().switchBlend(false);
    }
}