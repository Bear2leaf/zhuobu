import BlackWireCone from "../drawobject/BlackWireCone.js";
import BlackWireCube from "../drawobject/BlackWireCube.js";
import ColorArrowLine from "../drawobject/ColorArrowLine.js";
import FpsText from "../drawobject/FpsText.js";
import FramesText from "../drawobject/FramesText.js";
import Gasket from "../drawobject/Gasket.js";
import Histogram from "../drawobject/Histogram.js";
import Mesh from "../drawobject/Mesh.js";
import Pointer from "../drawobject/Pointer.js";
import SkinMesh from "../drawobject/SkinMesh.js";
import SplashText from "../drawobject/SplashText.js";
import Sprite from "../drawobject/Sprite.js";
import { FontInfo } from "../drawobject/Text.js";
import TexturedCube from "../drawobject/TexturedCube.js";
import Point from "../geometry/Point.js";
import CacheManager from "../manager/CacheManager.js";
import InputManager from "../manager/InputManager.js";
import { Vec4 } from "../math/Vector.js";
import RenderingContext from "../renderingcontext/RenderingContext.js";
import Node from "../structure/Node.js";
import Texture from "../texture/Texture.js";
import Factory from "./Factory.js";
import TextureFactory from "./TextureFactory.js";

export default class DrawObjectFactory implements Factory {
  private readonly fontTexture: Texture;
  private readonly fontInfo: FontInfo;
  private readonly defaultTexture: Texture;
  constructor(
    private readonly gl: RenderingContext
    , cacheManager: CacheManager
    , textureFactory: TextureFactory
    , private readonly inputManager: InputManager
  ) {
    this.fontTexture = textureFactory.createFontTexture();
    this.fontInfo = cacheManager.getFontInfo("boxy_bold_font");
    this.defaultTexture = textureFactory.createTestTexture();
  }
  createSplashText() {
    const splashText = new SplashText(this.gl, this.fontInfo, this.fontTexture);
    return splashText;
  }
  createMesh(positions: Float32Array
    , normals: Float32Array
    , indices: Uint16Array
    , node: Node
  ) {
    node.addDrawObject(new Mesh(this.gl, this.defaultTexture, positions, normals, indices));
    return node;
  }
  createSkinMesh(position: Float32Array
    , normal: Float32Array
    , weights: Float32Array
    , textureCoord: Float32Array
    , joints: Uint16Array
    , indices: Uint16Array
    , jointNodes: Node[]
    , inverseBindMatrixData: Float32Array
    , jointTexture: Texture
    , node: Node
  ) {
    node.addDrawObject(new SkinMesh(this.gl
      , this.defaultTexture
      , position
      , normal
      , weights
      , textureCoord
      , joints
      , indices
      , jointNodes
      , inverseBindMatrixData
      , jointTexture
      , node));
  }
  createPointer() {
    const node = new Node();
    node.addDrawObject(new Pointer(this.gl, this.defaultTexture, this.inputManager.onTouchStart, this.inputManager.onTouchMove, this.inputManager.onTouchEnd, this.inputManager.onTouchCancel))
    return node;
  }
  createFramesText() {
    const node = new Node();
    node.addDrawObject(new FramesText(this.gl, this.fontInfo, this.fontTexture))
    return node
  }
  createFpsText() {
    const node = new Node();
    node.addDrawObject(new FpsText(this.gl, this.fontInfo, this.fontTexture))
    return node
  }
  createHistogram() {
    const node = new Node();
    node.addDrawObject(new Histogram(this.gl, this.defaultTexture))
    return node;
  }
  createSprite(x: number = 0, y: number = 0, scale: number = 1) {
    const node = new Node();
    node.addDrawObject(new Sprite(this.gl, this.defaultTexture, x, y, scale, [1, 1, 1, 1], [0, 0]))
    return node;
  }
  createColorArrowLine() {
    const node = new Node();
    node.addDrawObject(new ColorArrowLine(this.gl, this.defaultTexture, new Point(0, 0, 0, 1, new Vec4(1, 0, 0, 1), 0), new Point(2, 0, 0, 1, new Vec4(1, 0, 0, 1), 1), new Point(0, 0, 0, 1, new Vec4(0, 1, 0, 1), 2), new Point(0, 2, 0, 1, new Vec4(0, 1, 0, 1), 3), new Point(0, 0, 0, 1, new Vec4(0, 0, 1, 1), 4), new Point(0, 0, 2, 1, new Vec4(0, 0, 1, 1), 5)));
    return node;
  }
  createBlackWireCube() {
    const node = new Node();
    node.addDrawObject(new BlackWireCube(this.gl, this.defaultTexture));
    return node;
  }
  createBlackWireCone() {
    const node = new Node();
    node.addDrawObject(new BlackWireCone(this.gl, this.defaultTexture));
    return node;
  }
  createGasket() {
    const node = new Node();
    node.addDrawObject(new Gasket(this.gl, this.defaultTexture));
    return node;
  }
  createTexturedCube(
  ) {
    const node = new Node();
    node.addDrawObject(new TexturedCube(this.gl, this.defaultTexture));
    return node;
  }
}