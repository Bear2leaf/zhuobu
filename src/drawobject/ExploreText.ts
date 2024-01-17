import Node from "../transform/Node.js";
import TRS from "../transform/TRS.js";
import SDFCharacter from "./SDFCharacter.js";

export default class ExploreText extends SDFCharacter {
    init(): void {
        super.init();
        this.updateChars("Explore");
        this.getEntity().get(TRS).getPosition().y = 250;
        this.getEntity().get(Node).updateWorldMatrix();
    }
}