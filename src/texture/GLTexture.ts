import Texture, { SkyboxArray, TextureBindIndex } from "./Texture.js";

export default class GLTexture extends Texture {
  generate(data?: ImageData | HTMLImageElement | SkyboxArray | Float32Array, width: number = 1, height: number = 1) {
    const rc = this.getContext();
    if (data === undefined) {
      rc.bindTexture(this.getTextureIndex());
      if (this.getBindIndex() === TextureBindIndex.Depth) {
        rc.texImage2D_DEPTH24_UINT_NULL(width, height);
      } else {
        rc.texImage2D_RGBA_RGBA_NULL(width, height);
      }
    } else if (data instanceof Float32Array) {
      rc.bindTexture(this.getTextureIndex());
      rc.texImage2D_RGBA32F_RGBA_FLOAT(width, height, data);
    } else if (data instanceof Array) {
      rc.bindSkyboxTexture(this.getTextureIndex());
      rc.texImage2D_RGBA_RGBA_Skybox(data);
      rc.bindSkyboxTexture();
    } else {
      rc.bindTexture(this.getTextureIndex());
      rc.texImage2D_RGBA_RGBA_Image(data as HTMLImageElement);
    }
    rc.bindTexture();
  }
  bind() {
    const rc = this.getContext();
    if (this.getBindIndex() === TextureBindIndex.Skybox) {
      rc.bindSkyboxTexture(this.getTextureIndex())
    } else {
      rc.activeTexture(this.getBindIndex())
      rc.bindTexture(this.getTextureIndex());

    }
  }
}