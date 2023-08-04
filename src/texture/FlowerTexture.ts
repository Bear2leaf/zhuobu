import GLTexture from "./GLTexture.js";
import { TextureIndex } from "./Texture.js";

export default class FlowerTexture extends GLTexture {
    private image?: HTMLImageElement;
    setImage(fontImage: HTMLImageElement) {
        this.image = fontImage;
    }
    getImage() {
        if (!this.image) throw new Error("Texture: Image is not set.");
        return this.image;
    }
    create(gl: WebGL2RenderingContext, bindIndex: number = TextureIndex.Default, wrapS?: number, wrapT?: number, filterMin?: number, filterMax?: number): void {
        super.create(gl, bindIndex, wrapS, wrapT, filterMin, filterMax);
        this.generate(2, 2, this.getImage());
    }
    
}