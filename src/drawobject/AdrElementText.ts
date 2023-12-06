import TRS from "../transform/TRS.js";
import SDFCharacter from "./SDFCharacter.js";

export default class AdrElementText extends SDFCharacter {
    init(): void {
        super.init();
        // create random words:
        const chars = [];
        const length = 10 + Math.floor(10 * Math.random());
        for (let i = 0; i < length; i++) {
            chars.push(String.fromCharCode(65 + Math.floor(52 * Math.random())));
        }   
        this.updateChars(chars.join(""));
        this.getEntity().get(TRS).getPosition().set(-200, 500 * Math.random() - 250, 0);
    }
}