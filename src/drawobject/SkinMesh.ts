import Node from "../transform/Node.js";
import Mesh from "./Mesh.js";
import Matrix from "../geometry/Matrix.js";
import { ArrayBufferIndex } from "../renderingcontext/RenderingContext.js";
import Texture from "../texture/Texture.js";
import AnimationController from "../controller/AnimationController.js";

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
    setSkinData(indices: Uint16Array, position: Float32Array, normal: Float32Array, weights: Float32Array, joints: Uint16Array, jointNodes: Node[], inverseBindMatrixData: Float32Array) {
        this.setMeshData(indices, position, normal);
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
        this.getJointTexture().generate(jointData, 4, this.jointNodes.length);
    }

}
