import RenderingContext from "../renderingcontext/RenderingContext.js";
import OffscreenCanvasTexture from "./OffscreenCanvasTexture.js";
import { TextureIndex } from "./Texture.js";

export default class SingleColorTexture extends OffscreenCanvasTexture {
    create(rc: RenderingContext): void {
        super.create(rc);
        this.setBindIndex(TextureIndex.OffscreenCanvas);
    }
    
}