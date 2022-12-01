import Shader from "./Shader.js";
import Texture from "./Texture.js";
import {
  ortho,
  gl
} from "./utils.js";

export default class TextRenderer {
  constructor() {

    /**
     * @type {Shader}
     */
    this.shader = new Shader();

    /**
     * @type {Texture}
     */
    this.texture = new Texture();
    this.shader.compile(`#version 300 es 
    in vec4 a_position; 
    uniform mat4 projection; 
    out vec2 v_texcoord; 
     
    void main() { 
      // Multiply the position by the matrix. 
      gl_Position = projection * vec4(a_position.xy, 0, 1); 
     
      // Pass the texcoord to the fragment shader. 
      v_texcoord = a_position.zw; 
    } `, `#version 300 es 
    precision highp float; 
     
    // Passed in from the vertex shader. 
    in vec2 v_texcoord; 
    out vec4 color; 
    uniform sampler2D u_texture; 
     
    uniform vec4 textColor; 
    void main() { 
      color = textColor * texture(u_texture, v_texcoord); 
    }`);
    this.shader.use().setInteger("u_texture", 0);
    this.shader.use().setMatrix4("projection", ortho(0, wx.getWindowInfo().windowWidth, wx.getWindowInfo().windowHeight, 0, -1, 1));
    this.fontInfo = {
      letterHeight: 8,
      spaceWidth: 8,
      spacing: -1,
      textureWidth: 64,
      textureHeight: 48,
      glyphInfos: {
        'a': {
          x: 0,
          y: 0,
          width: 8,
        },
        'b': {
          x: 8,
          y: 0,
          width: 8,
        },
        'c': {
          x: 16,
          y: 0,
          width: 8,
        },
        'd': {
          x: 24,
          y: 0,
          width: 8,
        },
        'e': {
          x: 32,
          y: 0,
          width: 8,
        },
        'f': {
          x: 40,
          y: 0,
          width: 8,
        },
        'g': {
          x: 48,
          y: 0,
          width: 8,
        },
        'h': {
          x: 56,
          y: 0,
          width: 8,
        },
        'i': {
          x: 0,
          y: 8,
          width: 8,
        },
        'j': {
          x: 8,
          y: 8,
          width: 8,
        },
        'k': {
          x: 16,
          y: 8,
          width: 8,
        },
        'l': {
          x: 24,
          y: 8,
          width: 8,
        },
        'm': {
          x: 32,
          y: 8,
          width: 8,
        },
        'n': {
          x: 40,
          y: 8,
          width: 8,
        },
        'o': {
          x: 48,
          y: 8,
          width: 8,
        },
        'p': {
          x: 56,
          y: 8,
          width: 8,
        },
        'q': {
          x: 0,
          y: 16,
          width: 8,
        },
        'r': {
          x: 8,
          y: 16,
          width: 8,
        },
        's': {
          x: 16,
          y: 16,
          width: 8,
        },
        't': {
          x: 24,
          y: 16,
          width: 8,
        },
        'u': {
          x: 32,
          y: 16,
          width: 8,
        },
        'v': {
          x: 40,
          y: 16,
          width: 8,
        },
        'w': {
          x: 48,
          y: 16,
          width: 8,
        },
        'x': {
          x: 56,
          y: 16,
          width: 8,
        },
        'y': {
          x: 0,
          y: 24,
          width: 8,
        },
        'z': {
          x: 8,
          y: 24,
          width: 8,
        },
        '0': {
          x: 16,
          y: 24,
          width: 8,
        },
        '1': {
          x: 24,
          y: 24,
          width: 8,
        },
        '2': {
          x: 32,
          y: 24,
          width: 8,
        },
        '3': {
          x: 40,
          y: 24,
          width: 8,
        },
        '4': {
          x: 48,
          y: 24,
          width: 8,
        },
        '5': {
          x: 56,
          y: 24,
          width: 8,
        },
        '6': {
          x: 0,
          y: 32,
          width: 8,
        },
        '7': {
          x: 8,
          y: 32,
          width: 8,
        },
        '8': {
          x: 16,
          y: 32,
          width: 8,
        },
        '9': {
          x: 24,
          y: 32,
          width: 8,
        },
        '-': {
          x: 32,
          y: 32,
          width: 8,
        },
        '*': {
          x: 40,
          y: 32,
          width: 8,
        },
        '!': {
          x: 48,
          y: 32,
          width: 8,
        },
        '?': {
          x: 56,
          y: 32,
          width: 8,
        },
        ' ': {
          x: 0,
          y: 40,
          width: 8,
        },
        'nono': {
          x: 0,
          y: 40,
          width: 8,
        },
      },
    };
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    this.vao = gl.createVertexArray();
    this.positionLocation = gl.getAttribLocation(this.shader.program, 'a_position');
    this.positionBuffer = gl.createBuffer();
    gl.bindVertexArray(this.vao);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, 6 * 4 * 4, gl.DYNAMIC_DRAW);
    gl.enableVertexAttribArray(this.positionLocation);
    gl.vertexAttribPointer(this.positionLocation, 4, gl.FLOAT, false, 0, 0);
  }
  async init() {
    const img = wx.createImage();
    img.src = "8x8-font.png";
    await new Promise((resolve, reject) => {img.onload = resolve; img.onerror = reject;})
    this.texture.generate(img);
  }
  /**
   * 
   * @param {number} x 
   * @param {number} y 
   * @param {number} scale 
   * @param {[number, number, number, number]} color 
   * @param  {...string} chars 
   */
  drawText(x, y, scale, color, ...chars) {
    gl.clearColor(0.3, 0.3, 0.3, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    this.shader.use();
    this.shader.setVector4f("textColor", color);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindVertexArray(this.vao);
    for (const c of chars) {
      const ch = this.fontInfo.glyphInfos[c] || this.fontInfo.glyphInfos[String.fromCharCode(c.charCodeAt(0) + 32)];
      const xpos = x;
      const ypos = y;
      const w = this.fontInfo.spaceWidth * scale;
      const h = this.fontInfo.letterHeight * scale;
      // update VBO for each character
      const vertices = new Float32Array([
        xpos, ypos + h, (ch.x) / this.fontInfo.textureWidth, (ch.y + this.fontInfo.letterHeight) / this.fontInfo.textureHeight,
        xpos + w, ypos, (ch.x + ch.width + this.fontInfo.spacing) / this.fontInfo.textureWidth, (ch.y) / this.fontInfo.textureHeight,
        xpos, ypos, (ch.x) / this.fontInfo.textureWidth, (ch.y) / this.fontInfo.textureHeight,
        xpos, ypos + h, (ch.x) / this.fontInfo.textureWidth, (ch.y + this.fontInfo.letterHeight) / this.fontInfo.textureHeight,
        xpos + w, ypos + h, (ch.x + ch.width + this.fontInfo.spacing) / this.fontInfo.textureWidth, (ch.y + this.fontInfo.letterHeight) / this.fontInfo.textureHeight,
        xpos + w, ypos, (ch.x + ch.width + this.fontInfo.spacing) / this.fontInfo.textureWidth, (ch.y) / this.fontInfo.textureHeight
      ]);
      this.texture.bind();
      gl.bindVertexArray(this.vao);
      gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
      gl.bufferSubData(gl.ARRAY_BUFFER, 0, vertices, 0);
      gl.bindBuffer(gl.ARRAY_BUFFER, null);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      x += w;
    }
    gl.bindVertexArray(null);
    gl.bindTexture(gl.TEXTURE_2D, null);
  }
}