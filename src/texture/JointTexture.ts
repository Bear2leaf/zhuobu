import RenderingContext from "../renderingcontext/RenderingContext.js";
import BaseTexture from "./BaseTexture.js";
import { TextureIndex } from "./Texture.js";

export default class JointTexture extends BaseTexture {
    create(gl: RenderingContext): void {
        super.create(gl);
        this.setBindIndex(TextureIndex.Joint);
    }
    
}