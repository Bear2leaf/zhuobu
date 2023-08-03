import Node from "../component/Node.js";
import VisualizeCamera from "../component/VisualizeCamera.js";
import { Vec4 } from "../math/Vector.js";
import WireCube from "./WireCube.js";

export default class CameraUpCube extends WireCube {
    update() {
        this.getEntity().get(Node).updateWorldMatrix(this.getEntity().get(VisualizeCamera).getViewInverse().translate(new Vec4(0, 0.5, 1, 1)).scale(new Vec4(0.1, 0.1, 0.1, 1)))
    }
}

