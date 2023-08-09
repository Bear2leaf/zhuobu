import RenderingContext from "../renderingcontext/RenderingContext.js";
import BaseTexture from "./BaseTexture.js";
import { TextureIndex } from "./Texture.js";

export default class FlowerTexture extends BaseTexture {
    private image?: HTMLImageElement;
    setImage(fontImage: HTMLImageElement) {
        this.image = fontImage;
    }
    getImage() {
        if (!this.image) throw new Error("Texture: Image is not set.");
        return this.image;
    }
    create(gl: RenderingContext): void {
        super.create(gl);
        this.generate(2, 2, this.getImage());
    }
    
}