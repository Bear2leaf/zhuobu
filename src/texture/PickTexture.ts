import DrawObject from "../drawobject/DrawObject.js";
import PickMap from "../texturemap/PickMap.js";
import GLTexture from "./GLTexture.js";
import { TextureIndex } from "./Texture.js";

export default class PickTexture extends GLTexture {
    init(): void {
        this.setBindIndex(TextureIndex.Pick);
        super.init();
        this.getSceneManager().all().forEach(scene => {
            scene.getComponents(PickMap).forEach(comp => {
                comp.getEntity().get(DrawObject).setTexture(this);
            });
        });
    }
}