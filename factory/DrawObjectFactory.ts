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

export default class DrawObjectFactory {
  createMesh(positions: Float32Array, normals: Float32Array, indices: Uint16Array, node: Node) {
    return new Mesh(positions, normals, indices, node);
  }
  createPointer(): import("../drawobject/Pointer.js").default {
    return new Pointer();
  }
  createFramesText(): import("../drawobject/Text.js").default {
      return  new Text(0, 40, 2, [1, 1, 1, 1], 0)
  }
  createFpsText(): import("../drawobject/Text.js").default {
      return  new Text(0, 40, 2, [1, 1, 1, 1], 0)
  }
  createHistogram(): import("../drawobject/Histogram.js").default {
      return  new Histogram();
  }
  createHappySprite(): import("../drawobject/Sprite.js").default {
      return  new Sprite(0, 150, 10, [1, 1, 1, 1], [0, 0], "happy");
  }
  createColorArrowLine() {
    return  new ColorArrowLine(new Point(0, 0, 0, 1, new Vec4(1, 0, 0, 1), 0), new Point(2, 0, 0, 1, new Vec4(1, 0, 0, 1), 1), new Point(0, 0, 0, 1, new Vec4(0, 1, 0, 1), 2), new Point(0, 2, 0, 1, new Vec4(0, 1, 0, 1), 3), new Point(0, 0, 0, 1, new Vec4(0, 0, 1, 1), 4), new Point(0, 0, 2, 1, new Vec4(0, 0, 1, 1), 5));;
  }
  createBlackWireCube() {
      return new BlackWireCube();
  }
  createBlackWireCone(){
      return new BlackWireCone()
  }
  createGasket() {
    return new Gasket();
  }
  createTexturedCube() {
    return new TexturedCube();
  }
}