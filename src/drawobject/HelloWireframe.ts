import GLTFAnimationController from "../controller/GLTFAnimationController.js";
import { Vec3, Vec2, flatten } from "../geometry/Vector.js";
import { ArrayBufferIndex } from "../renderingcontext/RenderingContext.js";
import Node from "../transform/Node.js";
import Mesh from "./Mesh.js";

export default class HelloWireframe extends Mesh {
    initMesh(): void {
        
        const gltf = this.getGLTF();
        const entity = this.getEntity();
        const node = gltf.getNodeByIndex(this.getNodeIndex());
        entity.set(Node, node.getNode())
        const primitive = gltf.getMeshByIndex(node.getMesh()).getPrimitiveByIndex(this.getPrimitiveIndex());
        const material = this.getGLTF().getMaterialByIndex(primitive.getMaterial());
        const positionIndex = primitive.getAttributes().getPosition();
        const texcoordIndex = primitive.getAttributes().getTexCoord();
        const normalIndex = primitive.getAttributes().getNormal();
        const indicesIndex = primitive.getIndices();
        this.setWireframeMeshData(
            gltf.getDataByAccessorIndex(indicesIndex) as Uint16Array
            , gltf.getDataByAccessorIndex(positionIndex) as Float32Array
            , gltf.getDataByAccessorIndex(normalIndex) as Float32Array
            , gltf.getDataByAccessorIndex(texcoordIndex) as Float32Array
        );
        if (entity.has(GLTFAnimationController)) {
            const animation = gltf.getAnimationByIndex(this.getAnimationIndex());
            gltf.createAnimationBuffers(this.getAnimationIndex());
            entity.get(GLTFAnimationController).setAnimationData(
                animation
            );
        }
    }

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
    draw(): void {
        this.getRenderingContext().switchBlend(true);
        this.getRenderingContext().switchDepthWrite(false);
        this.getRenderingContext().switchCulling(false);
        super.draw();
        this.getRenderingContext().switchCulling(true);
        this.getRenderingContext().switchDepthWrite(true);
        this.getRenderingContext().switchBlend(false);
    }
}