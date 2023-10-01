import TRS from "../component/TRS.js";
import Text from "./Text.js";

export default class FramesText extends Text {
    init(): void {
        super.init();

        const scale = 2;
        this.getEntity().get(TRS).getScale().set(scale, -scale, scale, 1);
        this.getEntity().get(TRS).getPosition().set(0, scale * 8 + 120, 0, 0);
    }
}