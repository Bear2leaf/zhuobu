import Node from "../component/Node.js";
import VisualizeCamera from "../component/VisualizeCamera.js";
import Matrix from "../math/Matrix.js";
import { Vec4 } from "../math/Vector.js";
import WireCone from "./WireCone.js";

export default class CameraLenCone extends WireCone {
    init() {

        super.init();
        const localMatrix = Matrix.copy(this.getEntity().get(VisualizeCamera).getViewInverse().translate(new Vec4(0, 0, 0.5, 1)).scale(new Vec4(0.25, 0.25, 0.25, 1)));
        this.getEntity().get(Node).setLocalMatrix(localMatrix)
        this.getEntity().get(Node).setSource();
    }
}

