import Node from "../transform/Node.js";
import Mesh from "./Mesh.js";
import Matrix from "../geometry/Matrix.js";
import { ArrayBufferIndex } from "../renderingcontext/RenderingContext.js";
import Texture from "../texture/Texture.js";
import AnimationController from "../controller/AnimationController.js";
import GLTFAnimationController from "../controller/GLTFAnimationController.js";

export default class SkinMesh extends Mesh {
    private readonly jointNodes: Node[] = [];
    private readonly jointMatrices: Matrix[] = [];
    private readonly inverseBindMatrices: Matrix[] = [];
    private jointTexture?: Texture;
    setJointTexture(texture: Texture) {
        this.jointTexture = texture;
    }
    getJointTexture() {
        if (!this.jointTexture) {
            throw new Error("jointTexture is not set");
        }
        return this.jointTexture;
    }
    initMesh(): void {

        const gltf = this.getGLTF();
        const entity = this.getEntity();
        const node = gltf.getNodeByIndex(this.getNodeIndex());
        const primitive = gltf.getMeshByIndex(node.getMesh()).getPrimitiveByIndex(this.getPrimitiveIndex());
        const positionIndex = primitive.getAttributes().getPosition();
        const texcoordIndex = primitive.getAttributes().getTexCoord();
        const normalIndex = primitive.getAttributes().getNormal();
        const indicesIndex = primitive.getIndices();
        const skin = gltf.getSkinByIndex(node.getSkin());
        const skeletonRootNode = gltf.getNodeByName(skin.getName());
        gltf.buildNodeTree(skeletonRootNode);
        entity.set(Node, skeletonRootNode.getNode());
        const jointNodes = skin.getJoints().map((joint) => gltf.getNodeByIndex(joint).getNode());
        const weightslIndex = primitive.getAttributes().getWeights();
        const jointsIndex = primitive.getAttributes().getJoints();
        const inverseBindMatrixIndex = skin.getInverseBindMatrices();
        this.bind();
        this.setSkinData(
            gltf.getDataByAccessorIndex(indicesIndex) as Uint16Array
            , gltf.getDataByAccessorIndex(positionIndex) as Float32Array
            , gltf.getDataByAccessorIndex(normalIndex) as Float32Array
            , texcoordIndex === undefined ?
                gltf.getDataByAccessorIndex(positionIndex) as Float32Array
                : gltf.getDataByAccessorIndex(texcoordIndex) as Float32Array
            , gltf.getDataByAccessorIndex(weightslIndex) as Float32Array
            , gltf.getDataByAccessorIndex(jointsIndex) as Uint16Array
            , jointNodes
            , gltf.getDataByAccessorIndex(inverseBindMatrixIndex) as Float32Array
        );
        if (entity.has(GLTFAnimationController)) {
            const animation = gltf.getAnimationByIndex(this.getAnimationIndex());
            gltf.createAnimationBuffers(this.getAnimationIndex());
            entity.get(GLTFAnimationController).setAnimationData(
                animation
            );
        }
    }
    setSkinData(indices: Uint16Array, position: Float32Array, normal: Float32Array, texcoord: Float32Array, weights: Float32Array, joints: Uint16Array, jointNodes: Node[], inverseBindMatrixData: Float32Array) {
        this.setMeshData(indices, position, normal, texcoord);
        this.jointNodes.splice(0, this.jointNodes.length, ...jointNodes);
        // create views for each joint and inverseBindMatrix
        for (let i = 0; i < this.jointNodes.length; ++i) {
            this.inverseBindMatrices.push(Matrix.fromFloat32Array(new Float32Array(
                inverseBindMatrixData.buffer,
                inverseBindMatrixData.byteOffset + Float32Array.BYTES_PER_ELEMENT * 16 * i,
                16)));
            this.jointMatrices.push(Matrix.fromFloat32Array(new Float32Array(
                new Float32Array(this.jointNodes.length * 16).buffer,
                Float32Array.BYTES_PER_ELEMENT * 16 * i,
                16)));
        }
        this.createABO(ArrayBufferIndex.Weights, weights, 4);
        this.createABO(ArrayBufferIndex.Joints, joints, 4);
    }
    update() {
        super.update();
        if (!this.getEntity().has(AnimationController)) {
            return;
        }
        const globalWorldInverse = this.getEntity().get(Node).getWorldMatrix().inverse();
        // go through each joint and get its current worldMatrix
        // apply the inverse bind matrices and store the
        // entire result in the texture
        for (let j = 0; j < this.jointNodes.length; ++j) {
            const joint = this.jointNodes[j];
            const dst = this.jointMatrices[j];
            Matrix.multiply(globalWorldInverse, joint.getWorldMatrix(), dst);
            Matrix.multiply(dst, this.inverseBindMatrices[j], dst);
        }
        const jointData = Matrix.flatten(this.jointMatrices);

        this.getJointTexture().active();
        this.getJointTexture().bind();
        this.getJointTexture().generate(jointData, 4, this.jointNodes.length);
    }

}
