

import TRS from "../transform/TRS.js";
import { Vec4 } from "../geometry/Vector.js";
import SDFCharacter from "./SDFCharacter.js";

export default class HeText extends SDFCharacter {
    init(): void {
        super.init();
        this.updateChars("和");
        const scale = 3;
        this.getEntity().get(TRS).getScale().set(scale, -scale, scale, 1);
        this.getEntity().get(TRS).getPosition().add(new Vec4(0, scale * 64, 1, 0));
    }
}