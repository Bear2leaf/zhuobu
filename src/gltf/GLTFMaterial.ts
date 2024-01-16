import GLTFPbrMetallicRoughness from "./GLTFPbrMetallicRoughness.js";

export default class GLTFMaterial {
    private readonly name: string;
    private readonly pbrMetallicRoughness: GLTFPbrMetallicRoughness;
    private readonly doubleSided: boolean;
    constructor(material: GLTFMaterial) {
        this.name = material.name;
        this.pbrMetallicRoughness = new GLTFPbrMetallicRoughness(material.pbrMetallicRoughness);
        this.doubleSided = material.doubleSided;
    }
    getName() {
        return this.name;
    }
    getPbrMetallicRoughness() {
        return this.pbrMetallicRoughness;
    }
    getDoubleSided() {
        return this.doubleSided;
    }
}