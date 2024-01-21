import ArrayBufferCache from "../cache/ArrayBufferCache.js";
import Node from "../transform/Node.js";
import Mesh from "../drawobject/Mesh.js";
import SkinMesh from "../drawobject/SkinMesh.js";
import Entity from "../entity/Entity.js";
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
import GLTFAnimationController from "../controller/GLTFAnimationController.js";
import HelloWireframe from "../drawobject/HelloWireframe.js";
import ImageCache from "../cache/ImageCache.js";

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
    private bufferCache?: ArrayBufferCache;
    private imageCache?: ImageCache;
    setImageCache(imageCache?: ImageCache) {
        this.imageCache = imageCache;
    }
    getImageCache(): ImageCache | undefined {
        return this.imageCache;
    }

    setName(name: string) {
        this.name = name;
    }
    getName() {
        if (this.name === undefined) throw new Error("name is not set");
        return this.name;
    }
    getImages() {
        if (this.images === undefined) throw new Error("images is not set");
        return this.images;
    }
    setBufferCache(cahce: ArrayBufferCache) {
        this.bufferCache = cahce;
    }
    getBufferCache() {
        if (this.bufferCache === undefined) throw new Error("bufferCache is not set");
        return this.bufferCache;
    }
    init(data: GLTF) {
        this.scene = data.scene;

        this.scenes = data.scenes?.map((scene) => new GLTFScene(scene));
        this.nodes = data.nodes?.map((node) => new GLTFNode(node));
        this.buffers = data.buffers?.map((buffer) => new GLTFBuffer(buffer));
        this.bufferViews = data.bufferViews?.map((bufferView) => new GLTFBufferView(bufferView));
        this.accessors = data.accessors?.map((accessor) => new GLTFAccessor(accessor));
        this.images = data.images?.map((image) => new GLTFImage(image));
        this.samplers = data.samplers;
        this.textures = data.textures?.map((texture) => new GLTFTexture(texture));
        this.materials = data.materials?.map((material) => new GLTFMaterial(material));
        this.meshes = data.meshes?.map((mesh) => new GLTFMesh(mesh));
        this.cameras = data.cameras?.map((camera) => new GLTFCamera(camera));
        this.animations = data.animations?.map((animation) => new GLTFAnimation(animation));
        this.skins = data.skins?.map((skin) => new GLTFSkin(skin));
        this.extensionsUsed = data.extensionsUsed;
        this.extensionsRequired = data.extensionsRequired;
        this.extensions = data.extensions;
        this.extras = data.extras;
        this.buildTextureImages();
    }
    getCameraByIndex(index: number) {
        if (!this.cameras) {
            throw new Error("cameras not found");
        }
        const camera = this.cameras[index];
        if (!camera) {
            throw new Error(`camera not found: ${index}`);
        }
        return camera;
    }
    getCameraTarget() {
        if (!this.nodes) {
            throw new Error("nodes not found");
        }
        const cameraTarget = this.nodes.find((node) => node.getName() === "CameraTarget");
        if (!cameraTarget) {
            throw new Error("cameraTarget not found");
        }
        return cameraTarget;
    }
    getMaterialByIndex(materialIndex: number) {
        if (!this.materials) {
            throw new Error("materials not found");
        }
        const material = this.materials[materialIndex];
        if (!material) {
            throw new Error(`material not found: ${materialIndex}`);
        }
        return material;
    }
    getImageByIndex(source: number) {
        if (!this.images) {
            throw new Error("images not found");
        }
        const image = this.images[source];
        if (!image) {
            throw new Error(`image not found: ${source}`);
        }
        return image;
    }
    getNodeByName(name: string) {
        if (!this.nodes) {
            throw new Error("nodes not found");
        }
        const node = this.nodes.find((node) => node.getName() === name);
        if (!node) {
            throw new Error(`node not found: ${name}`);
        }
        return node;
    }
    getTextureByIndex(index: number) {
        if (!this.textures) {
            throw new Error("textures not found");
        }
        const texture = this.textures[index];
        if (!texture) {
            throw new Error(`texture not found: ${index}`);
        }
        return texture;
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
        const accessor = this.accessors[index];
        const bufferView = this.bufferViews[accessor.getBufferView()];
        const buffer = this.buffers[bufferView.getBuffer()];
        const typedArray = glTypeToTypedArray(accessor.getComponentType());
        const data = new typedArray(buffer.getBufferData(this.getBufferCache()), bufferView.getByteOffset(), accessor.getCount() * accessor.getNumComponents());
        return data;
    }
    buildTextureImages() {

        if (!this.meshes) {
            throw new Error("nodes not found");
        }
        for (const mesh of this.meshes) {
            for (const primitive of mesh.getPrimitives()) {
                const materialIndex = primitive.getMaterial();
                if (this.materials) {
                    const material = this.materials[materialIndex];
                    if (material !== undefined) {

                        const baseColorTexture = material.getPbrMetallicRoughness().getBaseColorTexture();
                        if (baseColorTexture) {

                            const textureIndex = baseColorTexture.getIndex();
                            const texture = this.textures && this.textures[textureIndex];
                            const imageIndex = texture && texture.getSource();
                            if (imageIndex === undefined) {
                                throw new Error(`imageIndex is undefined: ${textureIndex}`);
                            }
                            const image = this.images && this.images[imageIndex];
                            if (image === undefined) {
                                throw new Error(`image is undefined: ${imageIndex}`);
                            }
                            const uri = image.getUri();

                            if (uri === undefined) {
                                throw new Error(`uri is undefined: ${imageIndex}`);
                            }
                            if (this.imageCache === undefined) {
                                throw new Error(`imageCache is undefined`);
                            }
                            image.setImage(this.imageCache.get(`resources/${uri.replace("../", "")}`));
                        }
                    }
                }
            }
        }
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
        const gltf = new GLTF();
        gltf.setName(this.getName());
        gltf.bufferCache = this.getBufferCache();
        gltf.imageCache = this.getImageCache();
        gltf.init(JSON.parse(JSON.stringify(this)));
        return gltf;
    }
}

