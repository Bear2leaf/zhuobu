import Animator from "./Animator.js";

export default class LinearAnimator extends Animator {
    interpolation(input: number, output: number, time: number): number {
        return input + (output - input) * time;
    }
    animate(): void {
        
    }
}