import Node from "../transform/Node.js";
import Matrix from "../geometry/Matrix.js";
import { Vec4 } from "../geometry/Vector.js";
import WireCone from "./WireCone.js";
import VisualizeCamera from "../wireframe/VisualizeCamera.js";

export default class CameraLenCone extends WireCone {
    init() {

        super.init();
        const localMatrix = Matrix.copy(this.getEntity().get(VisualizeCamera).getViewInverse().translate(new Vec4(0, 0, 0.5, 1)).scale(new Vec4(0.25, 0.25, 0.25, 1)));
        this.getEntity().get(Node).setLocalMatrix(localMatrix)
        this.getEntity().get(Node).setSource();
    }
}

