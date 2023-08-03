import Node from "../component/Node.js";
import VisualizeCamera from "../component/VisualizeCamera.js";
import WireCube from "./WireCube.js";

export default class FrustumCube extends WireCube {
    update() {
        this.getEntity().get(Node).updateWorldMatrix(this.getEntity().get(VisualizeCamera).getFrustumTransformMatrix())
    }
}

