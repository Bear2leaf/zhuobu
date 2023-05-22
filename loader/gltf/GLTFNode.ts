import SkinMesh from "../../drawobject/SkinMesh.js";
import Node from "../../structure/Node.js";
import TRS from "../../structure/TRS.js";
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
    constructor(node: GLTFNode) {
        this.name = node.name;
        this.mesh = node.mesh;
        this.skin = node.skin;
        this.children = node.children;
        this.translation = node.translation;
        this.rotation = node.rotation;
        this.scale = node.scale;
        this.matrix = node.matrix;
        this.node = new Node(new TRS(this.translation, this.rotation, this.scale), this.name);
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
        const node = new Node(new TRS(this.translation, this.rotation, this.scale), this.name);
        if (this.children && this.children.length) {
            this.children.forEach((index) => {
                const childNode = gltf.getNodeByIndex(index).createSkinJointNode(gltf);
                childNode.setParent(node);
            });
        }
        return node;
    }
    createFirstPrimitiveDrawObject(gltf: GLTF, gl: WebGL2RenderingContext) {
        if (this.mesh === undefined) {
            return;
        }
        if (this.skin === undefined) {
            return;
        }
        const mesh = gltf.getMeshByIndex(this.mesh);
        const skin = gltf.getSkinByIndex(this.skin);
        const primitive = mesh.getPrimitives()[0];
        if (!primitive) {
            throw "primitive is undefined"
        }
        const jointNodes = skin.getJoints().map((joint) => gltf.getNodeByIndex(joint).getNode());
        const positionIndex = primitive.getAttributes().getPosition();
        const texcoordIndex = primitive.getAttributes().getTexCoord();
        const normalIndex = primitive.getAttributes().getNormal();
        const weightslIndex = primitive.getAttributes().getWeights();
        const jointsIndex = primitive.getAttributes().getJoints();
        const indicesIndex = primitive.getIndices();
        const inverseBindMatrixIndex = gltf.getSkinByIndex(0).getInverseBindMatrices();
        const count = gltf.getAccessorByIndex(positionIndex).getCount();
        gltf.getDrawObjectFactory().createSkinMesh(
            gltf.getWebGLBufferByAccessorIndex(gl, positionIndex) as WebGLBuffer
            , gltf.getWebGLBufferByAccessorIndex(gl, normalIndex) as WebGLBuffer
            , gltf.getWebGLBufferByAccessorIndex(gl, weightslIndex) as WebGLBuffer
            , gltf.getWebGLBufferByAccessorIndex(gl, texcoordIndex) as WebGLBuffer
            , gltf.getWebGLBufferByAccessorIndex(gl, jointsIndex) as WebGLBuffer
            , gltf.getWebGLBufferByAccessorIndex(gl, indicesIndex) as WebGLBuffer
            , count
            , jointNodes
            , gltf.getDataByAccessorIndex(inverseBindMatrixIndex) as Float32Array
            , gltf.getTextureFactory().createJointTexture()
            , this.node);
    }
    buildRootChildren(gltf: GLTF, parent: Node) {
        const node = new Node(new TRS(this.translation, this.rotation, this.scale), this.name);
        node.setParent(parent);
    }
    getName() {
        return this.name;
    }
    getNode() {
        return this.node;
    }
}