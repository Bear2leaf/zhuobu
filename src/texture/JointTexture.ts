import RenderingContext from "../contextobject/RenderingContext.js";
import BaseTexture from "./BaseTexture.js";
import { TextureIndex } from "./Texture.js";

export default class JointTexture extends BaseTexture {
    create(rc: RenderingContext): void {
        super.create(rc);
        this.setBindIndex(TextureIndex.Joint);
    }
    
}