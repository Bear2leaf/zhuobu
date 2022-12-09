import Renderer from "./Renderer.js";
import Shader from "./Shader.js";
import Texture from "./Texture.js";
import {
  gl,
  device,
  hexToRGBA
} from "./global.js";
import Camera from "./Camera.js";
import Text from "./Text.js";
import GameObject from "./GameObject.js";
import { text_2d } from "./shader_source.js";
import TiledWorld from "./TiledWorld.js";

export default class TiledRenderer implements Renderer {
  private readonly shader: Shader;
  private readonly textures: Map<string, Texture>;
  private readonly camera: Camera;
  private readonly world: TiledWorld;
  private readonly vao: WebGLVertexArrayObject;
  private readonly vbo: WebGLBuffer;
  constructor(camera: Camera) {
    this.camera = camera;
    this.shader = new Shader();
    this.vao = gl.createVertexArray()!;
    this.vbo = gl.createBuffer()!;
    this.world = new TiledWorld("Sprout Lands - Sprites - Basic pack");
    this.textures = new Map();
  }
  async init() {
    const shader = text_2d;
    this.shader.compile(shader.vs, shader.fs);
    this.shader.use().setInteger("u_texture", 0);

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.bindVertexArray(this.vao);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo);
    gl.bufferData(gl.ARRAY_BUFFER, 4096 * 4 * 4, gl.DYNAMIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 4, gl.FLOAT, false, 0, 0);
    await this.world.init();
    this.world.maps.forEach(map => {
      map.tilesets.forEach(tileset => {
        const texture = new Texture();
        texture.generate(tileset.image);
        this.textures.set(tileset.source, texture);
      })
    })
    this.camera.moveBy(0, 0);
  }
  render() {
    this.shader.use();
    this.shader.setVector4f("textColor", [1, 1, 1, 1]);
    this.camera.setZoom(2)
    gl.clearColor(...hexToRGBA(this.world.getBgColor()));
    gl.clear(gl.COLOR_BUFFER_BIT);
    this.shader.use().setMatrix4("projection", this.camera.getMartix());
    gl.activeTexture(gl.TEXTURE0);
    gl.bindVertexArray(this.vao);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo);
    this.world.draw(this.textures);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    gl.bindVertexArray(null);
    gl.bindTexture(gl.TEXTURE_2D, null);
  }
}