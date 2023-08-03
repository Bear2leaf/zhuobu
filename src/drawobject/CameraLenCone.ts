import Node from "../component/Node.js";
import VisualizeCamera from "../component/VisualizeCamera.js";
import { Vec4 } from "../math/Vector.js";
import WireCone from "./WireCone.js";

export default class CameraLenCone extends WireCone {
    update() {
        this.getEntity().get(Node).updateWorldMatrix(this.getEntity().get(VisualizeCamera).getViewInverse().translate(new Vec4(0, 0, 0.5, 1)).scale(new Vec4(0.25, 0.25, 0.25, 1)))
    }
}

