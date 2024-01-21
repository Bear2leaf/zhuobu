import TRS from "../transform/TRS.js";
import Text from "./Text.js";

export default class FpsText extends Text {
    initContextObjects(): void {
        super.initContextObjects();

        const scale = 4;
        this.getEntity().get(TRS).getScale().set(scale, -scale, scale, 1);
        this.getEntity().get(TRS).getPosition().set(0, scale * 8 + 40, 0, 0);
    }
}