import Texture, { SkyboxArray } from "./Texture.js";

export default class GLTexture extends Texture {
    generate(data?: ImageData | HTMLImageElement | SkyboxArray | Float32Array, width: number = 1, height: number = 1) {
        const rc = this.getContext();
        rc.texImage2D_RGBA_RGBA_NULL(width, height);
    }
    active() {
        const rc = this.getContext();
        rc.activeTexture(this.getBindIndex())
    }
    bind() {
        const rc = this.getContext();
        rc.bindTexture(this.getTextureIndex());
    }
}