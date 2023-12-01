import GLTexture from "./GLTexture.js";
import { TextureIndex } from "./Texture.js";

export default class RenderTexture extends GLTexture {
    init(): void {
        this.setBindIndex(TextureIndex.Render);
        super.init();
    }
    
}