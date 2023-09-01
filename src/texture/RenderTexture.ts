import RenderingContext from "../contextobject/RenderingContext.js";
import BaseTexture from "./BaseTexture.js";
import { TextureIndex } from "./Texture.js";

export default class RenderTexture extends BaseTexture {
    create(rc: RenderingContext): void {
        super.create(rc);
        this.setBindIndex(TextureIndex.Render);
    }
    
}