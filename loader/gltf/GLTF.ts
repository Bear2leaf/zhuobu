import Camera from "../../Camera.js";
import { device } from "../../device/Device.js";
import DrawObject from "../../drawobject/DrawObject.js";
import Renderer from "../../renderer/Renderer.js";
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
import GLTFSkin from "./GLTFSkin.js";
import GLTFTexture from "./GLTFTexture.js";

const glTypeToTypedArrayMap = {
    '5120': Int8Array,    // device.gl.BYTE
    '5121': Uint8Array,   // device.gl.UNSIGNED_BYTE
    '5122': Int16Array,   // device.gl.SHORT
    '5123': Uint16Array,  // device.gl.UNSIGNED_SHORT
    '5124': Int32Array,   // device.gl.INT
    '5125': Uint32Array,  // device.gl.UNSIGNED_INT
    '5126': Float32Array, // device.gl.FLOAT
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
    private readonly scene: number;
    private readonly nodes: readonly GLTFNode[];
    private readonly buffers: readonly GLTFBuffer[];
    private readonly bufferViews: readonly GLTFBufferView[];
    private readonly accessors: readonly GLTFAccessor[];
    private readonly images?: readonly GLTFImage[];
    private readonly samplers?: readonly GLTFSampler[];
    private readonly textures?: readonly GLTFTexture[];
    private readonly materials: readonly GLTFMaterial[];
    private readonly meshes: readonly GLTFMesh[];
    private readonly cameras?: readonly GLTFCamera[];
    private readonly animations?: readonly GLTFAnimation[];
    private readonly skins?: readonly GLTFSkin[];
    private readonly extensionsUsed?: readonly string[];
    private readonly extensionsRequired?: readonly string[];
    private readonly extensions?: readonly string[];
    private readonly extras?: readonly string[];

    constructor(data?: GLTF) {
        if (!data) {
            data = device.gltfCache.get("static/gltf/hello.gltf");
            if (!data) {
                throw new Error("gltf not found");
            }
        }
        this.scene = data.scene;
        this.nodes = data.nodes;
        this.buffers = data.buffers;
        this.bufferViews = data.bufferViews;
        this.accessors = data.accessors;
        this.images = data.images;
        this.samplers = data.samplers;
        this.textures = data.textures;
        this.materials = data.materials;
        this.meshes = data.meshes;
        this.cameras = data.cameras;
        this.animations = data.animations;
        this.skins = data.skins;
        this.extensionsUsed = data.extensionsUsed;
        this.extensionsRequired = data.extensionsRequired;
        this.extensions = data.extensions;
        this.extras = data.extras;
        console.log(this)
    }
    render(renderer: Renderer, camera: Camera) {
    }
}

