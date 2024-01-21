import TRS from "../transform/TRS.js";
import Text from "./Text.js";

export default class FramesText extends Text {
    initContextObjects(): void {
        super.initContextObjects();

        const scale = 2;
        this.getEntity().get(TRS).getScale().set(scale, -scale, scale, 1);
        this.getEntity().get(TRS).getPosition().set(0, scale * 8 + 120, 0, 0);
    }
}