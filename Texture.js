import {
  gl
} from "./utils.js";
export default class Texture {
  constructor() {
    this.tex = gl.createTexture();
    this.internalFormat = gl.RGBA;
    this.imageFormat = gl.RGBA;
    this.wrapS = gl.REPEAT;
    this.wrapT = gl.REPEAT;
    this.filterMin = gl.NEAREST;
    this.filterMax = gl.NEAREST;
  }
  generate(data) {
    gl.bindTexture(gl.TEXTURE_2D, this.tex);
    gl.texImage2D(gl.TEXTURE_2D, 0, this.internalFormat, this.imageFormat, gl.UNSIGNED_BYTE, data);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, this.wrapS);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, this.wrapT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, this.filterMin);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, this.filterMax);
    gl.bindTexture(gl.TEXTURE_2D, null);
  }
  bind() {
    gl.bindTexture(gl.TEXTURE_2D, this.tex);
  }
}