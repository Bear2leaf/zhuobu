import { Vec3, Vec4 } from "../geometry/Vector.js";
import { OrthoCamera } from "./OrthoCamera.js";

export class FrontgroundCamera extends OrthoCamera {

    init(): void {
        super.init();
        this.getView().scale(new Vec3(1, 1, 100)).translate(new Vec4(0, 0, 0, 1));
    }

}