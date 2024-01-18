import TRS from "../transform/TRS.js";
import Mesh from "./Mesh.js";

export default class HelloMultiMesh extends Mesh {
    init(): void {
        super.init();
        // this.getEntity().get(TRS).getPosition().y = -1;
        this.getEntity().get(TRS).getScale().multiply(5);
    }
}