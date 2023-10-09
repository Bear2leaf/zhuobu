import TRS from "../transform/TRS.js";
import Animator from "./Animator.js";


export default class CircleAnimator extends Animator {
    private deltaTime: number = 0;
    private lastTime: number = 0;
    private localTime: number = 0;
    init(): void {
        this.getEntity().get(TRS).getScale().set(10, 10, 1, 1);
    }
    setTime(time: number): void {
        super.setTime(time);
        this.deltaTime = time - this.lastTime;
        this.lastTime = time;
        if (this.isPaused()) {
            return;
        }
        this.localTime += this.deltaTime;
    }

    animate(): void {
        if (this.isPaused()) return;
        const time = this.localTime;
        this.getEntity().get(TRS).getPosition().set(Math.sin(time / 500) * 150 + 150, Math.cos(time / 500) * 150 + 150, 0, 1);
    }
}