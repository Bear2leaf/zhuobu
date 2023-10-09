import TRS from "../transform/TRS.js";
import Animator from "./Animator.js";

export default class CameraAnimator extends Animator {
    init(): void {
        this.getEntity().get(TRS).getPosition().set(2, 5, 7);
    }
    getEye() {
        return this.getEntity().get(TRS).getPosition();
    }
    animate(): void {
        this.getEye().set(2, 5, 10 * Math.sin(this.getTime() / 1000));
    }
}