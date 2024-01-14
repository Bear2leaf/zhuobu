import Node from "../transform/Node.js";
import TRS from "../transform/TRS.js";
import Mesh from "./Mesh.js";

export default class HelloMultiMesh extends Mesh {
    init(): void {
        this.setNodeIndex(0)
        super.init();
        // this.getEntity().get(TRS).getRotation().set(0, (1 / 4) * Math.PI, (-1 / 32) * Math.PI);
        this.getEntity().get(TRS).getScale().set(5, 5, 5);
    }
}