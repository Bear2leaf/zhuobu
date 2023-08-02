import TRS from "../component/TRS.js";
import Text from "./Text.js";

export default class FpsText extends Text {
    init(): void {
        super.init();

        const scale = 4;
        this.getEntity().get(TRS).getScale().set(scale, -scale, scale, 1);
        this.getEntity().get(TRS).getPosition().set(0, scale * 8 + 40, 0, 0);
    }
}