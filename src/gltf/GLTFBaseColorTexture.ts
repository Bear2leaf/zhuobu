import Texture from "../texture/Texture.js";

export default class GLTFBaseColorTexture {
    private readonly index: number;
    private texture?: Texture;
    constructor(baseColorTexture: GLTFBaseColorTexture) {
        this.index = baseColorTexture.index;
    }
    getIndex() {
        return this.index;
    }
    setTexture(texture: Texture) {
        this.texture = texture;
    }
    getTexture() {
        if (this.texture === undefined) {
            throw new Error("Texture not set");
        }
        return this.texture;
    }
}