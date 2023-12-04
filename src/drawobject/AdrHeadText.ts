import TRS from "../transform/TRS.js";
import SDFCharacter from "./SDFCharacter.js";

export default class AdrHeadText extends SDFCharacter {
    init(): void {
        super.init();
        this.updateChars("Adr Head!");
        this.getEntity().get(TRS).getPosition().set(0, 0, 0);
    }
}