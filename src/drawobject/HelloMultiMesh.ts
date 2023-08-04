import TRS from "../component/TRS.js";
import Mesh from "./Mesh.js";

export default class HelloMultiMesh extends Mesh {
    init(): void {
        this.setNodeIndex(1)
        super.init();
        this.getEntity().get(TRS).getPosition().set(-6, 4, -10, 1);
    }
}