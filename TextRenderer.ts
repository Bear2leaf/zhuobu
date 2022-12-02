import Renderer from "./Renderer.js";
import Shader from "./Shader.js";
import Texture from "./Texture.js";
import {
  ortho,
  gl,
  device
} from "./global.js";

export default class TextRenderer implements Renderer {
  shader: Shader;
  texture: Texture;
  fontInfo: { [key: string]: { width: number, height: number, x: number, y: number } };
  vao: WebGLVertexArrayObject;
  positionLocation: number;
  positionBuffer: WebGLBuffer;
  constructor() {

    this.shader = new Shader();
    this.vao = gl.createVertexArray()!;
    this.positionBuffer = gl.createBuffer()!;

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
    this.shader.use().setMatrix4("projection", ortho(0, device.getWindowInfo().windowWidth, device.getWindowInfo().windowHeight, 0, -1, 1));
    this.fontInfo = {
      ' ': {
        x:50,
        y:18,
        height:0,
        width:4
      },
      '\n': {
        x:0,
        y:0,
        height:8,
        width:0
      },
      '!': {
        x: 1,
        y: 0,
        height: 8,
        width: 4
      },
      '1': {
        x: 9,
        y: 9,
        height: 8,
        width: 4
      },
      '2': {
        x: 14,
        y: 9,
        height: 8,
        width: 7
      },
      '<': {
        x: 11,
        y: 18,
        height: 8,
        width: 6
      },
    };
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    this.positionLocation = gl.getAttribLocation(this.shader.program, 'a_position');
    gl.bindVertexArray(this.vao);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, 6 * 4 * 4, gl.DYNAMIC_DRAW);
    gl.enableVertexAttribArray(this.positionLocation);
    gl.vertexAttribPointer(this.positionLocation, 4, gl.FLOAT, false, 0, 0);
  }
  async init() {
    const img = device.createImage() as HTMLImageElement;
    img.src = "boxy_bold_font.png";
    await new Promise((resolve, reject) => { img.onload = resolve; img.onerror = reject; })
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
  drawText(x: number, y: number, scale: number, color: [number, number, number, number], ...chars: string[]) {
    this.shader.use();
    this.shader.setVector4f("textColor", color);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindVertexArray(this.vao);
    const ox = x;
    const oy = y;
    for (const c of chars) {
      const ch = this.fontInfo[c];
      const xpos = x;
      const ypos = y;
      const w = ch.width * scale;
      const h = ch.height * scale;
      x += w;
      if (c === '\n') {
        x = ox;
        y += h;
        continue;
      } else if (c === ' ') {
        continue;
      }
      // update VBO for each character
      const vertices = new Float32Array([
        xpos, ypos + h, (ch.x - 0.5) / 111, (ch.y + ch.height + 0.5) / 80,
        xpos + w, ypos, (ch.x + ch.width + 0.5) / 111, (ch.y - 0.5) / 80,
        xpos, ypos, (ch.x - 0.5) / 111, (ch.y - 0.5) / 80,
        xpos, ypos + h, (ch.x - 0.5) / 111, (ch.y + ch.height + 0.5) / 80,
        xpos + w, ypos + h, (ch.x + ch.width + 0.5) / 111, (ch.y + ch.height + 0.5) / 80,
        xpos + w, ypos, (ch.x + ch.width + 0.5) / 111, (ch.y - 0.5) / 80
      ]);
      this.texture.bind();
      gl.bindVertexArray(this.vao);
      gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
      gl.bufferSubData(gl.ARRAY_BUFFER, 0, vertices, 0);
      gl.bindBuffer(gl.ARRAY_BUFFER, null);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    }
    gl.bindVertexArray(null);
    gl.bindTexture(gl.TEXTURE_2D, null);
  }
}