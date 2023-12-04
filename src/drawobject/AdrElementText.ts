import TRS from "../transform/TRS.js";
import SDFCharacter from "./SDFCharacter.js";

export default class AdrElementText extends SDFCharacter {
    init(): void {
        super.init();
        this.updateChars("Adr Element!");
        this.getEntity().get(TRS).getPosition().set(0, -100, 0);
    }
}