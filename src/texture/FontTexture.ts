import GLTexture from "./GLTexture.js";

export default class FontTexture extends GLTexture {
    init(): void {
        super.init();
        this.generate(0, 0, this.getCacheManager().getImage("boxy_bold_font"));
    }

}