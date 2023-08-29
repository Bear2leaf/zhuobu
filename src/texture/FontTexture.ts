import RenderingContext from "../contextobject/RenderingContext.js";
import BaseTexture from "./BaseTexture.js";

export default class FontTexture extends BaseTexture {
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