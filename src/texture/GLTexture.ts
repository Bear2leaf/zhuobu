import { Vec2 } from "../math/Vector.js";
import Texture from "./Texture.js";

export default class GLTexture implements Texture {
  private gl?: WebGL2RenderingContext;
  private texture: WebGLTexture | null = null;
  private bindIndex: number = 0;
  private internalFormat: number = 0;
  private imageFormat: number = 0;
  private wrapS: number = 0;
  private wrapT: number = 0;
  private filterMin: number = 0;
  private filterMax: number = 0;
  private width: number = 0;
  private height: number = 0;
  create(gl: WebGL2RenderingContext, bindIndex: number, wrapS: number = gl.CLAMP_TO_EDGE, wrapT: number = gl.CLAMP_TO_EDGE, filterMin: number = gl.NEAREST, filterMax: number = gl.NEAREST) {
    this.gl = gl;
    this.texture = this.gl.createTexture();
    this.bindIndex = this.gl.TEXTURE0 + bindIndex;
    this.internalFormat = this.gl.RGBA;
    this.imageFormat = this.gl.RGBA;
    this.wrapS = wrapS;
    this.wrapT = wrapT;
    this.filterMin = filterMin;
    this.filterMax = filterMax;
  }
  generate(width: number, height: number, data: HTMLImageElement | Float32Array | undefined) {
    if (this.gl === undefined) {
      throw new Error("GLTexture is not initialized.");
    }
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
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
    if (this.gl === undefined) {
      throw new Error("GLTexture is not initialized.");
    }
    this.gl.activeTexture(this.bindIndex)
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
  }
}