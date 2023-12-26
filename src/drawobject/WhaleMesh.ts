import Node from "../transform/Node.js";
import TRS from "../transform/TRS.js";
import SkinMesh from "./SkinMesh.js";

export default class WhaleMesh extends SkinMesh {
    init(): void {
        this.setNodeIndex(4);
        super.init();
        this.getEntity().get(TRS).getPosition().set(0, 0.0, 0);
        this.getEntity().get(TRS).getRotation().set(0, 0, 0);
        this.getEntity().get(Node).updateWorldMatrix();
    }
}