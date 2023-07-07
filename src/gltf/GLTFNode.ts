import Node from "../component/Node.js";
import TRS from "../component/TRS.js";
import Mesh from "../drawobject/Mesh.js";
import SkinMesh from "../drawobject/SkinMesh.js";
import Entity from "../entity/Entity.js";
import SkinMeshObject from "../entity/SkinMeshObject.js";
import GLTF from "./GLTF.js";

export default class GLTFNode {
    private readonly name: string;
    private readonly mesh?: number;
    private readonly skin?: number;
    private readonly children?: number[];
    private readonly translation?: number[];
    private readonly rotation?: number[];
    private readonly scale?: number[];
    private readonly matrix?: number[];
    private node?: Node;
    constructor(node: GLTFNode) {
        this.name = node.name;
        this.mesh = node.mesh;
        this.skin = node.skin;
        this.children = node.children;
        this.translation = node.translation;
        this.rotation = node.rotation;
        this.scale = node.scale;
        this.matrix = node.matrix;
    }

    getChildrenIndices() {
        return this.children;
    }
    getChildrenNodes(gltf: GLTF) {
        if (this.children === undefined) {
            return []
        } else {
            return this.children.map((index) => gltf.getNodeByIndex(index));
        }
    }
    getNode() {
        if (this.node === undefined) {
            throw new Error("node not found");
        }
        return this.node;
    }
    createSkinJointNode(skinMeshObject: SkinMeshObject) {
        const trs = skinMeshObject.get(TRS);
        trs.getPosition().fromArray(this.translation || [0, 0, 0, 1]);
        trs.getRotation().fromArray(this.rotation || [0, 0, 0, 1]);
        trs.getScale().fromArray(this.scale || [1, 1, 1, 1]);
        const node = skinMeshObject.get(Node);
        node.setName(this.name);
        this.node = node;
    }
    createFirstPrimitiveDrawObject(gltf: GLTF, entity: Entity) {
        if (this.mesh === undefined) {
            return;
        }
        const mesh = gltf.getMeshByIndex(this.mesh);
        const primitive = mesh.getPrimitiveByIndex(0);
        const positionIndex = primitive.getAttributes().getPosition();
        const texcoordIndex = primitive.getAttributes().getTexCoord();
        const normalIndex = primitive.getAttributes().getNormal();
        const indicesIndex = primitive.getIndices();
        if (this.skin !== undefined) {

            const skin = gltf.getSkinByIndex(this.skin);
            const jointNodes = skin.getJoints().map((joint) => gltf.getNodeByIndex(joint).getNode());
            const weightslIndex = primitive.getAttributes().getWeights();
            const jointsIndex = primitive.getAttributes().getJoints();
            const inverseBindMatrixIndex = gltf.getSkinByIndex(0).getInverseBindMatrices();
            entity.get(SkinMesh).setSkinData(
                gltf.getDataByAccessorIndex(indicesIndex) as Uint16Array
                , gltf.getDataByAccessorIndex(positionIndex) as Float32Array
                , gltf.getDataByAccessorIndex(normalIndex) as Float32Array
                , gltf.getDataByAccessorIndex(weightslIndex) as Float32Array
                , gltf.getDataByAccessorIndex(jointsIndex) as Uint16Array
                , jointNodes
                , gltf.getDataByAccessorIndex(inverseBindMatrixIndex) as Float32Array
            );
        } else {
            entity.get(Mesh).setMeshData(
                gltf.getDataByAccessorIndex(indicesIndex) as Uint16Array
                , gltf.getDataByAccessorIndex(positionIndex) as Float32Array
                , gltf.getDataByAccessorIndex(normalIndex) as Float32Array
            );
        }
    }
    getName() {
        return this.name;
    }
}