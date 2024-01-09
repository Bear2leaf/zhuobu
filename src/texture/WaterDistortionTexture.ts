import GLTexture from "./GLTexture.js";

export default class WaterDistortionTexture extends GLTexture {

    generate(data: HTMLImageElement): void {
        const rc = this.getContext();
        rc.texImage2D_RGBA_RGBA_Image(data);
    }
}