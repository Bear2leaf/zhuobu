

import TRS from "../component/TRS.js";
import { Vec4 } from "../math/Vector.js";
import Text from "./Text.js";

export default class HelloWorldText extends Text {
    init(): void {
        super.init();
        this.updateChars("Hello world!");
        const scale = 3;
        this.getEntity().get(TRS).getScale().set(scale, -scale, scale, 1);
        this.getEntity().get(TRS).getPosition().add(new Vec4(0, scale * 8, 1, 0));
    }
}