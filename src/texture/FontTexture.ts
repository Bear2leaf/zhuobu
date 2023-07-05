import GLTexture from "./GLTexture.js";
import { TextureIndex } from "./Texture.js";

export default class FontTexture extends GLTexture {
    private fontImage?: HTMLImageElement;
    setFontImage(fontImage: HTMLImageElement) {
        this.fontImage = fontImage;
    }
    getFontImage() {
        if (!this.fontImage) throw new Error("FontTexture: fontImage is not set.");
        return this.fontImage;
    }

    create(gl: WebGL2RenderingContext, bindIndex: number = TextureIndex.Default, wrapS?: number, wrapT?: number, filterMin?: number, filterMax?: number): void {
        super.create(gl, bindIndex, wrapS, wrapT, filterMin, filterMax);
        this.generate(0, 0, this.fontImage)
    }
}