import GLTexture from "./GLTexture.js";
import { SkyboxArray } from "./Texture.js";

export default class FlowerTexture extends GLTexture {
    generate(data: HTMLImageElement): void {
        const rc = this.getContext();
        rc.texImage2D_RGBA_RGBA_Image(data);
    }
}