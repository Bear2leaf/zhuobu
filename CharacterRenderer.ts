import Renderer from "./Renderer.js";
import Shader from "./Shader.js";
import Texture from "./Texture.js";
import {
  gl,
  device,
} from "./global.js";
import Camera from "./Camera.js";
import { text_2d } from "./shader_source.js";
import Character from "./Character.js";

export default class CharacterRenderer implements Renderer {
  private readonly shader: Shader;
  private readonly texture: Texture;
  private readonly camera: Camera;
  private readonly vao: WebGLVertexArrayObject;
  private readonly vbo: WebGLBuffer;
  private readonly characters: Character[];
  constructor(camera: Camera) {
    this.characters = [];
    this.camera = camera;
    this.shader = new Shader();
    this.vao = gl.createVertexArray()!;
    this.vbo = gl.createBuffer()!;
    this.texture = new Texture();
  }
  add(character: Character): void {
    this.characters.push(character);
  }
  async init() {
    const shader = text_2d;
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
    img.src = "Basic Charakter Spritesheet.png";
    await new Promise((resolve, reject) => { img.onload = resolve; img.onerror = reject; })
    this.texture.generate(img);
    this.camera.setZoom(1)
    this.camera.moveBy(0, 0);
  }
  render() {
    this.shader.use();
    this.shader.setVector4f("textColor", [1, 1, 1, 1]);
    this.shader.use().setMatrix4("projection", this.camera.getMartix());
    gl.activeTexture(gl.TEXTURE0);
    gl.bindVertexArray(this.vao);
    for (const character of this.characters) {

      const xpos = character.x;
      const ypos = character.y;
      const h = 16;
      const w = 16;
      const tex_h = 16;
      const tex_w = 16;
      const tex_xpos = 16;
      const tex_ypos = 16;
      const sheet_h = 192;
      const sheet_w = 192;
      // update VBO for each character
      const vertices = new Float32Array([
        xpos, ypos + h, (tex_xpos) / sheet_w, (tex_ypos + tex_h) / sheet_h,
        xpos + w, ypos, (tex_xpos + tex_w) / sheet_w, (tex_ypos) / sheet_h,
        xpos, ypos, (tex_xpos) / sheet_w, (tex_ypos) / sheet_h,
        xpos, ypos + h, (tex_xpos) / sheet_w, (tex_ypos + tex_h) / sheet_h,
        xpos + w, ypos + h, (tex_xpos + tex_w) / sheet_w, (tex_ypos + tex_h) / sheet_h,
        xpos + w, ypos, (tex_xpos + tex_w) / sheet_w, (tex_ypos) / sheet_h
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