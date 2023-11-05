import RenderingContext from "../renderingcontext/RenderingContext.js";
import GLTexture from "./GLTexture.js";

export default class FlowerTexture extends GLTexture {
    private image?: HTMLImageElement;
    setImage(fontImage: HTMLImageElement) {
        this.image = fontImage;
    }
    getImage() {
        if (!this.image) throw new Error("Texture: Image is not set.");
        return this.image;
    }
    create(rc: RenderingContext): void {
        super.create(rc);
        this.generate(2, 2, this.getImage());
    }
    
}