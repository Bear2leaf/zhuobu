import TextureContainer from "../container/TextureContainer.js";
import SkinMesh from "../drawobject/SkinMesh.js";
import GLTexture from "./GLTexture.js";
import { TextureIndex } from "./Texture.js";

export default class JointTexture extends GLTexture {
    init(): void {
        this.setBindIndex(TextureIndex.Joint);
        super.init();

        this.getSceneManager().all().forEach(scene => {
            scene.getComponents(SkinMesh).forEach(comp => {
                comp.getEntity().get(TextureContainer).setTexture(this, this.getBindIndex());
            });
        });
    }
}