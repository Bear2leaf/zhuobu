import Texture, { SkyboxArray, TextureBindIndex } from "./Texture.js";

export default class GLTexture extends Texture {
    generate(data?: ImageData | HTMLImageElement | SkyboxArray | Float32Array, width: number = 1, height: number = 1) {
        const rc = this.getContext();
        if (this.getBindIndex() === TextureBindIndex.Skybox) {
            rc.bindSkyboxTexture(this.getTextureIndex())
        } else {
            rc.bindTexture(this.getTextureIndex());
        }
        if (this.getBindIndex() === TextureBindIndex.Depth) {
            rc.texImage2D_DEPTH24_UINT_NULL(width, height);
        } else if (data === undefined) {
            rc.texImage2D_RGBA_RGBA_NULL(width, height);
        } else if (data instanceof Float32Array) {
            rc.texImage2D_RGBA32F_RGBA_FLOAT(width, height, data);
        } else if (data instanceof Array) {
            rc.texImage2D_RGBA_RGBA_Skybox(data);
        } else {
            rc.texImage2D_RGBA_RGBA_Image(data as HTMLImageElement);
        }
        rc.bindTexture();
    }
    bind() {
        const rc = this.getContext();
        if (this.getBindIndex() === TextureBindIndex.Skybox) {
            rc.activeTexture(this.getBindIndex())
            rc.bindSkyboxTexture(this.getTextureIndex())
        } else {
            rc.activeTexture(this.getBindIndex())
            rc.bindTexture(this.getTextureIndex());

        }
    }
}