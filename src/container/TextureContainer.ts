
import Component from "../component/Component.js";
import Texture, { TextureIndex } from "../texture/Texture.js";

export default class TextureContainer extends Component {
    private readonly textureMap: Map<TextureIndex, Texture> = new Map();
    setTexture(texture: Texture, index: TextureIndex = TextureIndex.Default) {
        this.textureMap.set(index, texture);
    }
    getTexture(index: TextureIndex = TextureIndex.Default): Texture {
        const texture = this.textureMap.get(index);
        if (texture === undefined) {
            throw new Error("texture not exist");
        }
        return texture;
    }
    getTextures() {
        return [...this.textureMap.values()];
    }
}