import RenderingContext from "../renderingcontext/RenderingContext.js";
import BaseTexture from "./BaseTexture.js";
import { TextureIndex } from "./Texture.js";

export default class FontTexture extends BaseTexture {
    private fontImage?: HTMLImageElement;
    setFontImage(fontImage: HTMLImageElement) {
        this.fontImage = fontImage;
    }
    getFontImage() {
        if (!this.fontImage) throw new Error("FontTexture: fontImage is not set.");
        return this.fontImage;
    }

    create(gl: RenderingContext): void {
        super.create(gl);
        this.generate(0, 0, this.fontImage)
    }
}