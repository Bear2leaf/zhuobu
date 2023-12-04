import DrawObject from "../drawobject/DrawObject.js";
import DepthMap from "../texturemap/DepthMap.js";
import GLTexture from "./GLTexture.js";
import { TextureIndex } from "./Texture.js";

export default class DepthTexture extends GLTexture {
    init(): void {
        this.setBindIndex(TextureIndex.Depth);
        super.init();
        this.getSceneManager().first().getComponents(DepthMap).forEach(comp => {
            comp.getEntity().get(DrawObject).setTexture(this);
        });
    }
}