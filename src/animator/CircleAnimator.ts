import TRS from "../transform/TRS.js";
import Animator from "./Animator.js";


export default class CircleAnimator extends Animator {
    init(): void {
        this.getEntity().get(TRS).getScale().set(10, 10, 1, 1);
    }

    animate(): void {
        const time = this.getTime() / 500;
        this.getEntity().get(TRS).getPosition().set(Math.sin(time) * 150 + 150, Math.cos(time) * 150 + 150, 0, 1);
    }
}