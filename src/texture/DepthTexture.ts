import TextureContainer from "../container/TextureContainer.js";
import DepthMap from "../texturemap/DepthMap.js";
import GLTexture from "./GLTexture.js";
import { TextureIndex } from "./Texture.js";

export default class DepthTexture extends GLTexture {
    init(): void {
        this.setBindIndex(TextureIndex.Depth);
        super.init();
        this.getSceneManager().all().forEach(scene => {
            scene.getComponents(DepthMap).forEach(comp => {
                comp.getEntity().get(TextureContainer).setTexture(this);
            });
        });
    }
}