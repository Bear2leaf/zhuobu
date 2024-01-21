import TRS from "../transform/TRS.js";
import SDFCharacter from "./SDFCharacter.js";

export default class HeText extends SDFCharacter {
    initContextObjects(): void {
        super.initContextObjects();
        this.updateChars("!和气生财ccb\n你好世界！\nHello world!");
        this.getEntity().get(TRS).getPosition().set(0, 1000 * Math.random(), 0);
    }
}