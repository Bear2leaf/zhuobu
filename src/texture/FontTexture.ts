import RenderingContext from "../renderingcontext/RenderingContext.js";
import GLTexture from "./GLTexture.js";

export default class FontTexture extends GLTexture {
    private fontImage?: HTMLImageElement;
    setFontImage(fontImage: HTMLImageElement) {
        this.fontImage = fontImage;
    }
    getFontImage() {
        if (!this.fontImage) throw new Error("FontTexture: fontImage is not set.");
        return this.fontImage;
    }

    create(rc: RenderingContext): void {
        super.create(rc);
        this.generate(0, 0, this.fontImage)
    }
}