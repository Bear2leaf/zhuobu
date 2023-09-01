import Node from "../component/Node.js";
import VisualizeCamera from "../component/VisualizeCamera.js";
import Matrix from "../geometry/Matrix.js";
import { Vec4 } from "../geometry/Vector.js";
import WireCube from "./WireCube.js";

export default class CameraUpCube extends WireCube {
    init() {
        super.init();
        const localMatrix = Matrix.copy(this.getEntity().get(VisualizeCamera).getViewInverse().translate(new Vec4(0, 0.5, 1, 1)).scale(new Vec4(0.1, 0.1, 0.1, 1)));
        this.getEntity().get(Node).setLocalMatrix(localMatrix)
        this.getEntity().get(Node).setSource();
    }
}

