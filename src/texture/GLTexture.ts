import Texture, { TextureBindIndex } from "./Texture.js";

export default class GLTexture extends Texture {
  generate(data?: ImageData | HTMLImageElement | Float32Array, width: number = 1, height: number = 1) {
    const rc = this.getContext();
    rc.bindTexture(this.getTextureIndex());
    if (data === undefined) {
      if (this.getBindIndex() === TextureBindIndex.Depth) {
        rc.texImage2D_DEPTH24_UINT_NULL(width, height);
      } else {
        rc.texImage2D_RGBA_RGBA_NULL(width, height);
      }
    } else if (data instanceof Float32Array) {
      rc.texImage2D_RGBA32F_RGBA_FLOAT(width, height, data);
    } else {
      rc.texImage2D_RGBA_RGBA_Image(data as HTMLImageElement);
    }
    rc.bindTexture();
  }
  bind() {
    const rc = this.getContext();
    rc.activeTexture(this.getBindIndex())
    rc.bindTexture(this.getTextureIndex());
  }
}