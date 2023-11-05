import RenderingContext from "../renderingcontext/RenderingContext.js";
import GLTexture from "./GLTexture.js";
import { TextureIndex } from "./Texture.js";

export default class DepthTexture extends GLTexture {
    create(rc: RenderingContext): void {
        super.create(rc);
        this.setBindIndex(TextureIndex.Depth);
    }
    
}