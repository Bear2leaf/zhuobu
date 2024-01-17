import Node from "../transform/Node.js";
import TRS from "../transform/TRS.js";
import SDFCharacter from "./SDFCharacter.js";

export default class InformationText extends SDFCharacter {
    init(): void {
        super.init();
        this.updateChars("Information")
        this.getEntity().get(TRS).getPosition().y = 500;
        this.getEntity().get(Node).updateWorldMatrix();
    }
}