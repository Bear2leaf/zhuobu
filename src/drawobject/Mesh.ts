import DrawObject from "./DrawObject.js";
import { ArrayBufferIndex } from "../renderingcontext/RenderingContext.js";
import GLTF from "../gltf/GLTF.js";
import Node from "../transform/Node.js";
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
            gltf.createAnimationBuffers(this.getAnimationIndex());
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