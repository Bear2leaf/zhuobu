import TRS from "../transform/TRS.js";
import Mesh from "./Mesh.js";

export default class HelloMultiMesh extends Mesh {
    init(): void {
        super.init();
        this.getEntity().get(TRS).getPosition().set(-6, 4, -10, 1);
    }
    initMesh(): void {
        this.setNodeIndex(1)
        super.initMesh();
    }
}