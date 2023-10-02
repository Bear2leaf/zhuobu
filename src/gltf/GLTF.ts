import ArrayBufferCache from "../cache/ArrayBufferCache.js";
import JSONCache from "../cache/FontInfoCache.js";
import GLTFAnimationController from "../component/GLTFAnimationController.js";
import Node from "../component/Node.js";
import TRS from "../component/TRS.js";
import Mesh from "../drawobject/Mesh.js";
import SkinMesh from "../drawobject/SkinMesh.js";
import Entity from "../entity/Entity.js";
import GLTFSkinMeshRenderer from "../renderer/GLTFSkinMeshRenderer.js";
import GLTFAccessor from "./GLTFAccessor.js";
import GLTFAnimation from "./GLTFAnimation.js";
import GLTFBuffer from "./GLTFBuffer.js";
import GLTFBufferView from "./GLTFBufferView.js";
import GLTFCamera from "./GLTFCamera.js";
import GLTFImage from "./GLTFImage.js";
import GLTFMaterial from "./GLTFMaterial.js";
import GLTFMesh from "./GLTFMesh.js";
import GLTFNode from "./GLTFNode.js";
import GLTFSampler from "./GLTFSampler.js";
import GLTFScene from "./GLTFScene.js";
import GLTFSkin from "./GLTFSkin.js";
import GLTFTexture from "./GLTFTexture.js";

const glTypeToTypedArrayMap = {
    '5120': Int8Array,    // gl.BYTE
    '5121': Uint8Array,   // gl.UNSIGNED_BYTE
    '5122': Int16Array,   // gl.SHORT
    '5123': Uint16Array,  // gl.UNSIGNED_SHORT
    '5124': Int32Array,   // gl.INT
    '5125': Uint32Array,  // gl.UNSIGNED_INT
    '5126': Float32Array, // gl.FLOAT
};

export type GLType = keyof typeof glTypeToTypedArrayMap;

// Given a GL type return the TypedArray needed
function glTypeToTypedArray(type: GLType) {
    if (type in glTypeToTypedArrayMap) {
        return glTypeToTypedArrayMap[type];
    }
    throw new Error(`no key: ${type}`);
}
export default class GLTF {
    private scene?: number;
    private scenes?: readonly GLTFScene[];
    private nodes?: readonly GLTFNode[];
    private buffers?: readonly GLTFBuffer[];
    private bufferViews?: readonly GLTFBufferView[];
    private accessors?: readonly GLTFAccessor[];
    private images?: readonly GLTFImage[];
    private samplers?: readonly GLTFSampler[];
    private textures?: readonly GLTFTexture[];
    private materials?: readonly GLTFMaterial[];
    private meshes?: readonly GLTFMesh[];
    private cameras?: readonly GLTFCamera[];
    private animations?: readonly GLTFAnimation[];
    private skins?: readonly GLTFSkin[];
    private extensionsUsed?: readonly string[];
    private extensionsRequired?: readonly string[];
    private extensions?: readonly string[];
    private extras?: readonly string[];

    private name?: string;
    private gltfCache?: JSONCache;
    private bufferCache?: ArrayBufferCache;

    setName(name: string) {
        this.name = name;
    }
    getName() {
        if (this.name === undefined) throw new Error("name is not set");
        return this.name;
    }
    setGLTFCache(gltfCache: JSONCache) {
        this.gltfCache = gltfCache;
    }
    setBufferCache(bufferCache: ArrayBufferCache) {
        this.bufferCache = bufferCache;
    }
    init() {
        if (!this.name || !this.gltfCache || !this.bufferCache) {
            throw new Error("name or gltfCache or bufferCache not initialized");
        }
        const data = this.gltfCache.get(`resources/gltf/${this.name}.gltf`) as GLTF;
        if (!data) {
            throw new Error(`data ${`resources/gltf/${this.name}.gltf`} not found`);
        }
        this.scene = data.scene;
        this.scenes = data.scenes?.map((scene) => new GLTFScene(scene));
        this.nodes = data.nodes?.map((node) => new GLTFNode(node));
        this.buffers = data.buffers?.map((buffer) => new GLTFBuffer(buffer));
        this.bufferViews = data.bufferViews?.map((bufferView) => new GLTFBufferView(bufferView));
        this.accessors = data.accessors?.map((accessor) => new GLTFAccessor(accessor));
        this.images = data.images;
        this.samplers = data.samplers;
        this.textures = data.textures;
        this.materials = data.materials;
        this.meshes = data.meshes?.map((mesh) => new GLTFMesh(mesh));
        this.cameras = data.cameras;
        this.animations = data.animations?.map((animation) => new GLTFAnimation(animation));
        this.skins = data.skins?.map((skin) => new GLTFSkin(skin));
        this.extensionsUsed = data.extensionsUsed;
        this.extensionsRequired = data.extensionsRequired;
        this.extensions = data.extensions;
        this.extras = data.extras;
    }

    getSkinByIndex(index: number) {
        if (!this.skins) {
            throw new Error("skins not found");
        }
        const skin = this.skins[index];
        if (!skin) {
            throw new Error(`skin not found: ${index}`);
        }
        return skin;
    }
    getDataByAccessorIndex(index: number) {
        if (!this.accessors) {
            throw new Error("accessors not found");
        }
        if (!this.bufferViews) {
            throw new Error("bufferViews not found");
        }
        if (!this.buffers) {
            throw new Error("buffers not found");
        }
        if (!this.bufferCache) {
            throw new Error("bufferCache not found");
        }
        const accessor = this.accessors[index];
        const bufferView = this.bufferViews[accessor.getBufferView()];
        const buffer = this.buffers[bufferView.getBuffer()];
        const typedArray = glTypeToTypedArray(accessor.getComponentType());
        const data = new typedArray(buffer.getBufferData(this.bufferCache), bufferView.getByteOffset(), accessor.getCount() * accessor.getNumComponents());
        return data;
    }
    buildMesh(entity: Entity, nodeIndex: number = 0) {
        if (!this.nodes) {
            throw new Error("nodes not found");
        }
        const node = this.nodes[nodeIndex];
        const mesh = this.getMeshByIndex(node.getMesh());
        const primitive = mesh.getPrimitiveByIndex(0);
        const positionIndex = primitive.getAttributes().getPosition();
        const texcoordIndex = primitive.getAttributes().getTexCoord();
        const normalIndex = primitive.getAttributes().getNormal();
        const indicesIndex = primitive.getIndices();
        if (entity.has(GLTFSkinMeshRenderer)) {
            const skin = this.getSkinByIndex(node.getSkin());
            const skeletonRootNode = this.getNodeByIndex(skin.getSkeleton());
            this.buildNodeTree(skeletonRootNode);
            skeletonRootNode.getNode().setParent(node.getNode());
            const jointNodes = skin.getJoints().map((joint) => this.getNodeByIndex(joint).getNode());
            const weightslIndex = primitive.getAttributes().getWeights();
            const jointsIndex = primitive.getAttributes().getJoints();
            const inverseBindMatrixIndex = skin.getInverseBindMatrices();
            entity.get(SkinMesh).setSkinData(
                this.getDataByAccessorIndex(indicesIndex) as Uint16Array
                , this.getDataByAccessorIndex(positionIndex) as Float32Array
                , this.getDataByAccessorIndex(normalIndex) as Float32Array
                , this.getDataByAccessorIndex(weightslIndex) as Float32Array
                , this.getDataByAccessorIndex(jointsIndex) as Uint16Array
                , jointNodes
                , this.getDataByAccessorIndex(inverseBindMatrixIndex) as Float32Array
            );
        } else {
            entity.get(Mesh).setWireframeMeshData(
                this.getDataByAccessorIndex(indicesIndex) as Uint16Array
                , this.getDataByAccessorIndex(positionIndex) as Float32Array
                , this.getDataByAccessorIndex(normalIndex) as Float32Array
            );
        }
        if (entity.has(GLTFAnimationController)) {

            const animation = this.getAnimationByIndex(0);
            animation.createBuffers(this);
            entity.get(GLTFAnimationController).setAnimationData(
                animation
            );
        }
        node.getNode().setParent(entity.get(Node));
    }
    buildNodeTree(gltfNode: GLTFNode) {
        const childrenIndices = gltfNode.getChildrenIndices();
        if (childrenIndices && childrenIndices.length > 0) {
            for (const childIndex of childrenIndices) {
                const childGLTFNode = this.getNodeByIndex(childIndex);
                childGLTFNode.getNode().setParent(gltfNode.getNode());
                this.buildNodeTree(childGLTFNode);
            }
        }
    }
    getMeshByIndex(index: number) {
        const mesh = this.meshes && this.meshes[index];
        if (!mesh) {
            throw new Error(`mesh not found: ${index}`);
        }
        return mesh;
    }
    getAnimationByIndex(index: number) {
        const animation = this.animations && this.animations[index];
        if (!animation) {
            throw new Error(`animation not found: ${index}`);
        }
        return animation;
    }
    getNodeByIndex(index: number) {
        const node = this.nodes && this.nodes[index];
        if (!node) {
            throw new Error(`node not found: ${index}`);
        }
        return node;
    }
    clone() {
        if (!this.name || !this.gltfCache || !this.bufferCache) {
            throw new Error("name or gltfCache or bufferCache not initialized");
        }
        const gltf = new GLTF();
        gltf.setName(this.name);
        gltf.setGLTFCache(this.gltfCache);
        gltf.setBufferCache(this.bufferCache);
        gltf.init();
        return gltf;
    }
}

