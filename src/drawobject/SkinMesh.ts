import Node from "../component/Node.js";
import Texture from "../texture/Texture.js";
import Mesh from "./Mesh.js";
import Matrix from "../math/Matrix.js";
import RenderingContext, { ArrayBufferIndex } from "../renderingcontext/RenderingContext.js";
import { TextureIndex } from "../texture/Texture.js";

export default class SkinMesh extends Mesh {
    private readonly jointNodes: Node[] = [];
    private readonly jointMatrices: Matrix[]  = [];
    private readonly inverseBindMatrices: Matrix[]  = [];
    private readonly origMatrices: Map<Node, Matrix> = new Map();
    private node?: Node;
    init() {
        this.node = this.getEntity().get(Node);
    }
    setSkinData(indices: Uint16Array, position: Float32Array, normal: Float32Array, weights: Float32Array, joints: Float32Array, jointTexture: Texture, jointNodes: Node[], inverseBindMatrixData: Float32Array) {
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
        // this.createABO(ArrayBufferIndex.Color, new Float32Array(position.length), 3);
        // this.createABO(ArrayBufferIndex.TextureCoord, textureCoord, 2);
        this.createABO(ArrayBufferIndex.Weights, weights, 4);
        this.createABO(ArrayBufferIndex.Joints, joints, 4);
        this.addTexture(TextureIndex.Joint, jointTexture);
    }
    setMeshData(indices: Uint16Array, position: Float32Array, normal: Float32Array) {

        this.updateEBO(indices);
        this.createABO(ArrayBufferIndex.Position, position, 3);
        this.createABO(ArrayBufferIndex.Normal, normal, 3);
    }
    update() {
        if (!this.node) {
            throw new Error("Node is not set");
        }
        const globalWorldInverse = this.node.getWorldMatrix().inverse();
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
        this.getTexture(TextureIndex.Joint).generate(4, this.jointNodes.length, jointData);
    }
    private frames = 0;
    draw(mode: number): void {
        this.animSkin(Math.sin(this.frames++ / 100) * 0.5);
        this.update();
        super.draw(mode);
    }
    animSkin(a: number) {
        for (let i = 0; i < this.jointNodes.length; ++i) {
            const joint = this.jointNodes[i];
            // if there is no matrix saved for this joint
            if (!this.origMatrices.has(joint)) {
                // save a matrix for joint
                this.origMatrices.set(joint, joint.getSource().getMatrix());
            }
            // get the original matrix
            const origMatrix = this.origMatrices.get(joint);
            if (!origMatrix) {
                throw new Error("origMatrix is undefined");
            }
            // rotate it
            const m = Matrix.identity().multiply(origMatrix).rotateX(a);
            // decompose it back into position, rotation, scale
            // into the joint
            Matrix.decompose(m, joint.getSource().getPosition(), joint.getSource().getRotation(), joint.getSource().getScale());
        }
    }
}