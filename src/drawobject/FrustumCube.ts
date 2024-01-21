import Node from "../transform/Node.js";
import VisualizeCamera from "../wireframe/VisualizeCamera.js";
import Matrix from "../geometry/Matrix.js";
import WireCube from "./WireCube.js";

export default class FrustumCube extends WireCube {
    initContextObjects() {

        super.initContextObjects();
        const localMatrix = Matrix.copy(this.getEntity().get(VisualizeCamera).getFrustumTransformMatrix());
        this.getEntity().get(Node).setLocalMatrix(localMatrix)
        this.getEntity().get(Node).setSource();
    }
}

