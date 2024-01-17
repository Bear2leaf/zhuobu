import Node from "../transform/Node.js";
import TRS from "../transform/TRS.js";
import SDFCharacter from "./SDFCharacter.js";

export default class RestText extends SDFCharacter {
    init(): void {
        super.init();
        this.updateChars("Rest")
        this.getEntity().get(TRS).getPosition().y = 200;
        this.getEntity().get(Node).updateWorldMatrix();
    }
}