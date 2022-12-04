import Renderer from "./Renderer.js";
import Shader from "./Shader.js";
import Texture from "./Texture.js";
import {
  gl,
  device
} from "./global.js";
import Camera from "./Camera.js";
import GameObject from "./GameObject.js";
import Text from "./Text.js";

export default class TextRenderer implements Renderer {
  private readonly shader: Shader;
  private readonly texture: Texture;
  private readonly camera: Camera;
  private fontInfo!: { [key: string]: { width: number, height: number, x: number, y: number } };
  private readonly vao: WebGLVertexArrayObject;
  private readonly vbo: WebGLBuffer;
  private readonly textObjects: Text[];
  constructor(camera: Camera) {
    this.camera = camera;
    this.shader = new Shader();
    this.textObjects = [];
    this.vao = gl.createVertexArray()!;
    this.vbo = gl.createBuffer()!;

    /**
     * @type {Texture}
     */
    this.texture = new Texture();
  }
  add(text: Text): void {
    this.textObjects.push(text);
  }
  async init() {
    const shader = await device.readJson("shader.json");
    this.shader.compile(shader.vs, shader.fs);
    this.shader.use().setInteger("u_texture", 0);

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.bindVertexArray(this.vao);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo);
    gl.bufferData(gl.ARRAY_BUFFER, 6 * 4 * 4, gl.DYNAMIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 4, gl.FLOAT, false, 0, 0);
    const img = device.createImage() as HTMLImageElement;
    img.src = "boxy_bold_font.png";
    await new Promise((resolve, reject) => { img.onload = resolve; img.onerror = reject; })
    this.texture.generate(img);
    this.fontInfo = await device.readJson("font_info.json");
    this.camera.setZoom(5)
    this.camera.moveTo(0, 0);
  }
  render() {
    for (const text of this.textObjects) {
      this.renderText(text);
    }
  }
  private renderText(text: Text) {
    let { x, y, scale, color, spacing, chars } = text;
    this.shader.use();
    this.shader.setVector4f("textColor", color);
    this.shader.use().setMatrix4("projection", this.camera.getMartix());
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
      x += w + spacing;
      if (c === '\n') {
        x = ox;
        y += h + spacing;
        continue;
      } else if (c === ' ') {
        continue;
      }
      // update VBO for each character
      const vertices = new Float32Array([
        xpos, ypos + h, (ch.x) / 111, (ch.y + ch.height) / 80,
        xpos + w, ypos, (ch.x + ch.width) / 111, (ch.y) / 80,
        xpos, ypos, (ch.x) / 111, (ch.y) / 80,
        xpos, ypos + h, (ch.x) / 111, (ch.y + ch.height) / 80,
        xpos + w, ypos + h, (ch.x + ch.width) / 111, (ch.y + ch.height) / 80,
        xpos + w, ypos, (ch.x + ch.width) / 111, (ch.y) / 80
      ]);
      this.texture.bind();
      gl.bindVertexArray(this.vao);
      gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo);
      gl.bufferSubData(gl.ARRAY_BUFFER, 0, vertices, 0);
      gl.bindBuffer(gl.ARRAY_BUFFER, null);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    }
    gl.bindVertexArray(null);
    gl.bindTexture(gl.TEXTURE_2D, null);
  }
}