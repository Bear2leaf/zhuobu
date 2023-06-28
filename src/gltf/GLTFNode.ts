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
    // private readonly node: Node;
    constructor(node: GLTFNode) {
        this.name = node.name;
        this.mesh = node.mesh;
        this.skin = node.skin;
        this.children = node.children;
        this.translation = node.translation;
        this.rotation = node.rotation;
        this.scale = node.scale;
        this.matrix = node.matrix;
        // this.node = new Node(new TRS(this.translation, this.rotation, this.scale), this.name);
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
    createSkinJointNode(gltf: GLTF) {
        // const node = new Node(new TRS(this.translation, this.rotation, this.scale), this.name);
        // if (this.children && this.children.length) {
        //     this.children.forEach((index) => {
        //         const childNode = gltf.getNodeByIndex(index).createSkinJointNode(gltf);
        //         childNode.setParent(node);
        //     });
        // }
        // return node;
    }
    createFirstPrimitiveDrawObject(gltf: GLTF) {
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

            // const skin = gltf.getSkinByIndex(this.skin);
            // const jointNodes = skin.getJoints().map((joint) => gltf.getNodeByIndex(joint).getNode());
            // const weightslIndex = primitive.getAttributes().getWeights();
            // const jointsIndex = primitive.getAttributes().getJoints();
            // const inverseBindMatrixIndex = gltf.getSkinByIndex(0).getInverseBindMatrices();
            // gltf.getDrawObjectFactory().createSkinMesh(
            //     gltf.getDataByAccessorIndex(positionIndex) as Float32Array
            //     , gltf.getDataByAccessorIndex(normalIndex) as Float32Array
            //     , gltf.getDataByAccessorIndex(weightslIndex) as Float32Array
            //     , gltf.getDataByAccessorIndex(texcoordIndex) as Float32Array
            //     , gltf.getDataByAccessorIndex(jointsIndex) as Uint16Array
            //     , gltf.getDataByAccessorIndex(indicesIndex) as Uint16Array
            //     , jointNodes
            //     , gltf.getDataByAccessorIndex(inverseBindMatrixIndex) as Float32Array
            //     , gltf.getTextureFactory().createJointTexture()
            //     , this.node
            // );
        } else {
            // gltf.getDrawObjectFactory().createMesh(
            //     gltf.getDataByAccessorIndex(positionIndex) as Float32Array
            //     , gltf.getDataByAccessorIndex(normalIndex) as Float32Array
            //     , gltf.getDataByAccessorIndex(indicesIndex) as Uint16Array
            //     , this.node
            // );
        }
    }
    buildRootChildren(gltf: GLTF, parent: Node) {
        // const node = new Node(new TRS(this.translation, this.rotation, this.scale), this.name);
        // node.setParent(parent);
    }
    getName() {
        return this.name;
    }
    // getNode() {
        // return this.node;
    // }
}