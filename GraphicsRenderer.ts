import Renderer from "./Renderer.js";
import Shader from "./Shader.js";
import {
  gl
} from "./global.js";
import Camera from "./Camera.js";
import { graphic_2d } from "./shader_source.js";
import Graphic from "./Graphic.js";

export default class GraphicsRenderer implements Renderer {
  private readonly shader: Shader;
  private readonly camera: Camera;
  private readonly vao: WebGLVertexArrayObject;
  private readonly vbo: WebGLBuffer;
  private readonly graphicObjects: Graphic[];
  constructor(camera: Camera) {
    this.camera = camera;
    this.shader = new Shader();
    this.graphicObjects = [];
    this.vao = gl.createVertexArray()!;
    this.vbo = gl.createBuffer()!;

  }
  add(graphic: Graphic): void {
    this.graphicObjects.push(graphic);
  }
  async init() {
    const shader = graphic_2d;
    this.shader.compile(shader.vs, shader.fs);

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.bindVertexArray(this.vao);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo);
    gl.bufferData(gl.ARRAY_BUFFER, 1 * 3 * 4, gl.DYNAMIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);
  }
  render() {
    for (const graphic of this.graphicObjects) {
      this.renderGraphic(graphic);
    }
  }
  private renderGraphic(graphic: Graphic) {
    let { x, y, scale, color } = graphic;
    this.shader.use();
    this.shader.setVector4f("graphicColor", color);
    this.shader.use().setMatrix4("projection", this.camera.getMartix());
    gl.bindVertexArray(this.vao);
    gl.bindVertexArray(this.vao);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo);
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, new Float32Array([x, y, scale]), 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    gl.drawArrays(gl.POINTS, 0, 1);
    gl.bindVertexArray(null);
  }
}