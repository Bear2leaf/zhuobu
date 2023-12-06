import Node from "../transform/Node.js";
import SDFCharacter from "./SDFCharacter.js";

export default class AdrText extends SDFCharacter {
    update() {
        this.getEntity().get(Node).getRoot().updateWorldMatrix();
    }
}