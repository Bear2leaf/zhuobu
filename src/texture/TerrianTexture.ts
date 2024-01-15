import GLTexture from "./GLTexture.js";

export default class TerrianTexture extends GLTexture {
    generate(data: HTMLImageElement): void {
        const rc = this.getContext();
        rc.texImage2D_RGBA_RGBA_Image(data);
    }
}