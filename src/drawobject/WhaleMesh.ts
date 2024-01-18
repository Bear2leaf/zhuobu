import Node from "../transform/Node.js";
import TRS from "../transform/TRS.js";
import SkinMesh from "./SkinMesh.js";

export default class WhaleMesh extends SkinMesh {
    init(): void {
        super.init();
        this.getEntity().get(TRS).getPosition().set(12, -0.2, 16);
        this.getEntity().get(TRS).getScale().set(0.1, 0.1, 0.1);
        this.getEntity().get(Node).updateWorldMatrix();
    }
}