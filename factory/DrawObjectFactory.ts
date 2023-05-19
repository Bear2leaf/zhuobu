import BlackWireCone from "../drawobject/BlackWireCone.js";
import BlackWireCube from "../drawobject/BlackWireCube.js";
import ColorArrowLine from "../drawobject/ColorArrowLine.js";
import Gasket from "../drawobject/Gasket.js";
import Histogram from "../drawobject/Histogram.js";
import Mesh from "../drawobject/Mesh.js";
import Pointer from "../drawobject/Pointer.js";
import Sprite from "../drawobject/Sprite.js";
import Text from "../drawobject/Text.js";
import TexturedCube from "../drawobject/TexturedCube.js";
import Point from "../geometry/Point.js";
import { Vec4 } from "../math/Vector.js";
import Node from "../structure/Node.js";
import Texture from "../texture/Texture.js";

export default class DrawObjectFactory {
  private readonly gl: WebGL2RenderingContext;
  private readonly texture: Texture;
  constructor(gl: WebGL2RenderingContext, texture: Texture) {
    this.gl = gl;
    this.texture = texture;
  }
  createMesh(positions: Float32Array, normals: Float32Array, indices: Uint16Array, node: Node) {
    return new Mesh(this.gl, this.texture, positions, normals, indices, node);
  }
  createPointer(onTouchStart: Function, onTouchMove: Function, onTouchEnd: Function, onTouchCancel: Function) {
    return new Pointer(this.gl, this.texture, onTouchStart, onTouchMove, onTouchEnd, onTouchCancel);
  }
  createFramesText(fontTexture: Texture) {
    return new Text(this.gl, fontTexture, 0, 40, 2, [1, 1, 1, 1], 0)
  }
  createFpsText(fontTexture: Texture) {
    return new Text(this.gl, fontTexture, 0, 40, 2, [1, 1, 1, 1], 0)
  }
  createHistogram() {
    return new Histogram(this.gl, this.texture);
  }
  createSprite(x: number = 0, y: number = 0, scale: number = 1, texture: Texture = this.texture) {
    return new Sprite(this.gl, texture,  x, y, scale, [1, 1, 1, 1], [0, 0]);
  }
  createColorArrowLine() {
    return new ColorArrowLine(this.gl, this.texture, new Point(0, 0, 0, 1, new Vec4(1, 0, 0, 1), 0), new Point(2, 0, 0, 1, new Vec4(1, 0, 0, 1), 1), new Point(0, 0, 0, 1, new Vec4(0, 1, 0, 1), 2), new Point(0, 2, 0, 1, new Vec4(0, 1, 0, 1), 3), new Point(0, 0, 0, 1, new Vec4(0, 0, 1, 1), 4), new Point(0, 0, 2, 1, new Vec4(0, 0, 1, 1), 5));;
  }
  createBlackWireCube() {
    return new BlackWireCube(this.gl, this.texture);
  }
  createBlackWireCone() {
    return new BlackWireCone(this.gl, this.texture)
  }
  createGasket() {
    return new Gasket(this.gl, this.texture);
  }
  createTexturedCube() {
    return new TexturedCube(this.gl, this.texture);
  }
}