import TRS from "../transform/TRS.js";
import SDFCharacter from "./SDFCharacter.js";

export default class AdrBodyText extends SDFCharacter {
    init(): void {
        super.init();
        this.updateChars("Adr Body!");
        this.getEntity().get(TRS).getPosition().set(0, -50, 0);
    }
}