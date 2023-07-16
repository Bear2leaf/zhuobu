import Node from "../component/Node.js";
import TRS from "../component/TRS.js";
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
    private readonly node: Node;
    constructor(gltfNode: GLTFNode) {
        this.name = gltfNode.name;
        this.mesh = gltfNode.mesh;
        this.skin = gltfNode.skin;
        this.children = gltfNode.children;
        this.translation = gltfNode.translation;
        this.rotation = gltfNode.rotation;
        this.scale = gltfNode.scale;
        this.matrix = gltfNode.matrix;
        const node = new Node();
        const trs = new TRS();
        node.setSource(trs);
        trs.getPosition().fromArray(this.translation || [0, 0, 0, 1]);
        trs.getRotation().fromArray(this.rotation || [0, 0, 0, 1]);
        trs.getScale().fromArray(this.scale || [1, 1, 1, 1]);
        node.setName(this.name);
        this.node = node;
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
    getMesh() {
        if (this.mesh === undefined) {
            throw new Error("mesh not found");
        }
        return this.mesh;
    }
    hasSkin() {
        if (this.skin === undefined) {
            return false;
        }
        return true;
    }
    getSkin() {
        if (this.skin === undefined) {
            throw new Error("skin not found");
        }
        return this.skin;
    }
    getName() {
        return this.name;
    }
}