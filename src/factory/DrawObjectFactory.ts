import Device from "../device/Device.js";
import BlackWireCone from "../drawobject/BlackWireCone.js";
import BlackWireCube from "../drawobject/BlackWireCube.js";
import ColorArrowLine from "../drawobject/ColorArrowLine.js";
import DrawObject from "../drawobject/DrawObject.js";
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
import { Vec4 } from "../math/Vector.js";
import RenderingContext from "../renderingcontext/RenderingContext.js";
import Node from "../structure/Node.js";
import UISystem from "../system/UISystem.js";
import Texture from "../texture/Texture.js";
import Factory from "./Factory.js";
import TextureFactory from "./TextureFactory.js";

export default class DrawObjectFactory implements Factory {
  createSplashText(textureFactory: TextureFactory, cacheManager: CacheManager, gl: RenderingContext) {
    const fontTexture = textureFactory.createFontTexture(gl, cacheManager);
    const fontInfo = cacheManager.getFontCache().get("static/font/boxy_bold_font.json");
    if (!fontInfo) {
      throw new Error("fontInfo is null");
    }
    const splashText = new SplashText(gl, fontInfo, fontTexture);
    return splashText;
  }
  createMesh(positions: Float32Array
    , normals: Float32Array
    , indices: Uint16Array
    , node: Node
    , gl: RenderingContext
    , texture: Texture
  ) {
    node.addDrawObject(new Mesh(gl, texture, positions, normals, indices));
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
    , gl: RenderingContext
    , texture: Texture
  ) {
    node.addDrawObject(new SkinMesh(gl
      , texture
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
  createPointer(onTouchStart: Function, onTouchMove: Function, onTouchEnd: Function, onTouchCancel: Function
    , gl: RenderingContext
    , texture: Texture) {
    const node = new Node();
    node.addDrawObject(new Pointer(gl, texture, onTouchStart, onTouchMove, onTouchEnd, onTouchCancel))
    return node;
  }
  createFramesText(uiSystem: UISystem, fontTexture: Texture
    , gl: RenderingContext
    , fontInfo: FontInfo
  ) {
    const node = new Node();
    node.addDrawObject(new FramesText(uiSystem, gl, fontInfo, fontTexture))
    return node
  }
  createFpsText(uiSystem: UISystem, fontTexture: Texture
    , gl: RenderingContext
    , fontInfo: FontInfo
  ) {
    const node = new Node();
    node.addDrawObject(new FpsText(uiSystem, gl, fontInfo, fontTexture))
    return node
  }
  createHistogram(uiSystem: UISystem
    , gl: RenderingContext
    , texture: Texture) {
    const node = new Node();
    node.addDrawObject(new Histogram(gl, uiSystem, texture))
    return node;
  }
  createSprite(x: number = 0, y: number = 0, scale: number = 1
    , gl: RenderingContext
    , texture: Texture
  ) {
    const node = new Node();
    node.addDrawObject(new Sprite(gl, texture, x, y, scale, [1, 1, 1, 1], [0, 0]))
    return node;
  }
  createColorArrowLine(
    gl: RenderingContext
    , texture: Texture
  ) {
    const node = new Node();
    node.addDrawObject(new ColorArrowLine(gl, texture, new Point(0, 0, 0, 1, new Vec4(1, 0, 0, 1), 0), new Point(2, 0, 0, 1, new Vec4(1, 0, 0, 1), 1), new Point(0, 0, 0, 1, new Vec4(0, 1, 0, 1), 2), new Point(0, 2, 0, 1, new Vec4(0, 1, 0, 1), 3), new Point(0, 0, 0, 1, new Vec4(0, 0, 1, 1), 4), new Point(0, 0, 2, 1, new Vec4(0, 0, 1, 1), 5)));
    return node;
  }
  createBlackWireCube(
    gl: RenderingContext
    , texture: Texture
  ) {
    const node = new Node();
    node.addDrawObject(new BlackWireCube(gl, texture));
    return node;
  }
  createBlackWireCone(
    gl: RenderingContext
    , texture: Texture
  ) {
    const node = new Node();
    node.addDrawObject(new BlackWireCone(gl, texture));
    return node;
  }
  createGasket(
    gl: RenderingContext
    , texture: Texture
  ) {
    const node = new Node();
    node.addDrawObject(new Gasket(gl, texture));
    return node;
  }
  createTexturedCube(
    gl: RenderingContext
    , texture: Texture
  ) {
    const node = new Node();
    node.addDrawObject(new TexturedCube(gl, texture));
    return node;
  }
}