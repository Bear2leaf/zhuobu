
import Component from "../component/Component.js";
import Texture from "../texture/Texture.js";

export default class TextureContainer extends Component {
    private texture?: Texture;
    setTexture(texture: Texture) {
        this.texture = texture;
    }
    getTexture(): Texture {
        if (this.texture === undefined) {
            throw new Error("Texture is not set");
        }
        return this.texture;
    }
}