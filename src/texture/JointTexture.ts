import DrawObject from "../drawobject/DrawObject.js";
import SkinMesh from "../drawobject/SkinMesh.js";
import GLTexture from "./GLTexture.js";
import { TextureIndex } from "./Texture.js";

export default class JointTexture extends GLTexture {
    init(): void {
        this.setBindIndex(TextureIndex.Joint);
        super.init();

        this.getSceneManager().first().getComponents(SkinMesh).forEach(comp => {
            comp.getEntity().get(DrawObject).setTexture(this, this.getBindIndex());
        });
    }
}