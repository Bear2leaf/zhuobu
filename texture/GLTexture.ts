import { Vec2 } from "../math/Vector.js";
import Texture from "./Texture.js";

export default class GLTexture implements Texture {
  private readonly gl;
  private readonly tex: WebGLTexture | null;
  private bindIndex: number;
  private readonly internalFormat: number;
  private readonly imageFormat: number;
  private readonly wrapS: number;
  private readonly wrapT: number;
  private readonly filterMin: number;
  private readonly filterMax: number;
  private width: number;
  private height: number;
  constructor(gl: WebGL2RenderingContext, bindIndex: number, wrapS: number = gl.CLAMP_TO_EDGE, wrapT: number = gl.CLAMP_TO_EDGE, filterMin: number = gl.NEAREST, filterMax: number = gl.NEAREST) {
    this.gl = gl;
    this.tex = this.gl.createTexture();
    this.bindIndex = this.gl.TEXTURE0 + bindIndex;
    this.internalFormat = this.gl.RGBA;
    this.imageFormat = this.gl.RGBA;
    this.wrapS = wrapS;
    this.wrapT = wrapT;
    this.filterMin = filterMin;
    this.filterMax = filterMax;

    this.width = 0;
    this.height = 0;
  }
  generate(width: number, height: number, data: HTMLImageElement | Float32Array | undefined) {
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.tex);
    if (data === undefined) {
      this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.internalFormat, width, height, 0, this.imageFormat, this.gl.UNSIGNED_BYTE, null)
      this.width = width;
      this.height = height;
    } else if (data instanceof Float32Array) {
      this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA32F, width, height, 0, this.imageFormat, this.gl.FLOAT, data)
      this.width = width;
      this.height = height;
    } else {
      this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.internalFormat, this.imageFormat, this.gl.UNSIGNED_BYTE, data);
      this.width = data.width;
      this.height = data.height;
    }
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.wrapS);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.wrapT);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.filterMin);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.filterMax);
    this.gl.bindTexture(this.gl.TEXTURE_2D, null);
  }
  getSize() {
    return new Vec2(this.width, this.height);
  }
  bind() {
    this.gl.activeTexture(this.bindIndex)
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.tex);
  }
}