import TRS from "../transform/TRS.js";
import SDFCharacter from "./SDFCharacter.js";

export default class HeText extends SDFCharacter {
    init(): void {
        super.init();
        this.getEntity().get(TRS).getScale().set(0.025, 0.025, 1);
        this.updateChars("!和气生财ccb\n你好世界！\nHello world!");
    }
}