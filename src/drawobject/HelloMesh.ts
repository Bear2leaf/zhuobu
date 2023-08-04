import TRS from "../component/TRS.js";
import Mesh from "./Mesh.js";

export default class HelloMesh extends Mesh {
    init(): void {
        super.init();
        this.getEntity().get(TRS).getPosition().set(0, 4, -10, 1);
    }
}