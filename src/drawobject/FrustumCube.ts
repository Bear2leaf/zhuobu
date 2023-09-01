import Node from "../component/Node.js";
import VisualizeCamera from "../component/VisualizeCamera.js";
import Matrix from "../geometry/Matrix.js";
import WireCube from "./WireCube.js";

export default class FrustumCube extends WireCube {
    init() {

        super.init();
        const localMatrix = Matrix.copy(this.getEntity().get(VisualizeCamera).getFrustumTransformMatrix());
        this.getEntity().get(Node).setLocalMatrix(localMatrix)
        this.getEntity().get(Node).setSource();
    }
}

