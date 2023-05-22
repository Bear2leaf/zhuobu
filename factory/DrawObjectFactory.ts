import BlackWireCone from "../drawobject/BlackWireCone.js";
import BlackWireCube from "../drawobject/BlackWireCube.js";
import ColorArrowLine from "../drawobject/ColorArrowLine.js";
import Gasket from "../drawobject/Gasket.js";
import Histogram from "../drawobject/Histogram.js";
import Mesh from "../drawobject/Mesh.js";
import Pointer from "../drawobject/Pointer.js";
import SkinMesh from "../drawobject/SkinMesh.js";
import Sprite from "../drawobject/Sprite.js";
import Text from "../drawobject/Text.js";
import TexturedCube from "../drawobject/TexturedCube.js";
import Point from "../geometry/Point.js";
import GLTFSkin from "../loader/gltf/GLTFSkin.js";
import { Vec4 } from "../math/Vector.js";
import { FontInfo } from "../renderer/TextRenderer.js";
import Node from "../structure/Node.js";
import Texture from "../texture/Texture.js";

export default class DrawObjectFactory {
  private readonly gl: WebGL2RenderingContext;
  private readonly texture: Texture;
  private readonly fontInfo: FontInfo;
  constructor(gl: WebGL2RenderingContext, texture: Texture, fontCache: Map<string, FontInfo>) {
    this.gl = gl;
    this.texture = texture;

    const fontInfo = fontCache.get("resource/font/boxy_bold_font.json");
    if (!fontInfo) {
      throw new Error("fontInfo not exist")
    }
    this.fontInfo = fontInfo;
  }
  createMesh(positions: Float32Array, normals: Float32Array, indices: Uint16Array, node: Node) {
    node.addDrawObject(new Mesh(this.gl, this.texture, positions, normals, indices, indices.length));
    return node;
  }
  createSkinMesh(position: WebGLBuffer
    , normal: WebGLBuffer
    , weights: WebGLBuffer
    , textureCoord: WebGLBuffer
    , joints: WebGLBuffer
    , indices: WebGLBuffer
    , count: number
    , jointNodes: Node[]
    , inverseBindMatrixData: Float32Array
    , jointTexture: Texture
    , node: Node) {
    node.addDrawObject(new SkinMesh(this.gl
      , this.texture
      , position
      , normal
      , weights
      , textureCoord
      , joints
      , indices
      , count
      , jointNodes
      , inverseBindMatrixData
      , jointTexture
      , node));
  }
  createPointer(onTouchStart: Function, onTouchMove: Function, onTouchEnd: Function, onTouchCancel: Function) {
    const node = new Node();
    node.addDrawObject(new Pointer(this.gl, this.texture, onTouchStart, onTouchMove, onTouchEnd, onTouchCancel))
    return node;
  }
  createFramesText(fontTexture: Texture) {
    const node = new Node();
    node.addDrawObject(new Text(this.gl, this.fontInfo, fontTexture, 0, 40, 2, [1, 1, 1, 1], 0))
    return node
  }
  createFpsText(fontTexture: Texture) {
    const node = new Node();
    node.addDrawObject(new Text(this.gl, this.fontInfo, fontTexture, 0, 20, 2, [1, 1, 1, 1], 0))
    return node
  }
  createHistogram() {
    const node = new Node();
    node.addDrawObject(new Histogram(this.gl, this.texture))
    return node;
  }
  createSprite(x: number = 0, y: number = 0, scale: number = 1, texture: Texture = this.texture) {
    const node = new Node();
    node.addDrawObject(new Sprite(this.gl, texture, x, y, scale, [1, 1, 1, 1], [0, 0]))
    return node;
  }
  createColorArrowLine() {
    const node = new Node();
    node.addDrawObject(new ColorArrowLine(this.gl, this.texture, new Point(0, 0, 0, 1, new Vec4(1, 0, 0, 1), 0), new Point(2, 0, 0, 1, new Vec4(1, 0, 0, 1), 1), new Point(0, 0, 0, 1, new Vec4(0, 1, 0, 1), 2), new Point(0, 2, 0, 1, new Vec4(0, 1, 0, 1), 3), new Point(0, 0, 0, 1, new Vec4(0, 0, 1, 1), 4), new Point(0, 0, 2, 1, new Vec4(0, 0, 1, 1), 5)));
    return node;
  }
  createBlackWireCube() {
    const node = new Node();
    node.addDrawObject(new BlackWireCube(this.gl, this.texture));
    return node;
  }
  createBlackWireCone() {
    const node = new Node();
    node.addDrawObject(new BlackWireCone(this.gl, this.texture));
    return node;
  }
  createGasket() {
    const node = new Node();
    node.addDrawObject(new Gasket(this.gl, this.texture));
    return node;
  }
  createTexturedCube() {
    const node = new Node();
    node.addDrawObject(new TexturedCube(this.gl, this.texture));
    return node;
  }
}