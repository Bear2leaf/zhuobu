import TRS from "../transform/TRS.js";
import Animator from "./Animator.js";


export default class CircleAnimator extends Animator {

    animate(): void {
        const time = this.getTime() / 500;
        this.getEntity().get(TRS).getPosition().x = Math.sin(time) * 150 + 150;
        this.getEntity().get(TRS).getPosition().y = Math.cos(time) * 150 + 150;
    }
}