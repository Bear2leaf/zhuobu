import GLTFBaseColorTexture from "./GLTFBaseColorTexture.js";

export default class GLTFPbrMetallicRoughness {
    private readonly baseColorFactor: number[];
    private readonly metallicFactor: number;
    private readonly roughnessFactor: number;
    private readonly baseColorTexture?: GLTFBaseColorTexture;
    private readonly metallicRoughnessTexture: number;
    constructor(pbrMetallicRoughness: GLTFPbrMetallicRoughness) {
        this.baseColorFactor = pbrMetallicRoughness.baseColorFactor;
        this.metallicFactor = pbrMetallicRoughness.metallicFactor;
        this.roughnessFactor = pbrMetallicRoughness.roughnessFactor;
        this.baseColorTexture = pbrMetallicRoughness.baseColorTexture ? new GLTFBaseColorTexture(pbrMetallicRoughness.baseColorTexture): undefined;
        this.metallicRoughnessTexture = pbrMetallicRoughness.metallicRoughnessTexture;
    }
    getBaseColorFactor() {
        return this.baseColorFactor;
    }
    getMetallicFactor() {
        return this.metallicFactor;
    }
    getRoughnessFactor() {
        return this.roughnessFactor;
    }
    getBaseColorTexture() {
        return this.baseColorTexture;
    }
    getMetallicRoughnessTexture() {
        return this.metallicRoughnessTexture;
    }
}