import GLTFAnimationController from "../component/GLTFAnimationController.js";

export default class Animator {
    private delta: number = 0;
    private time: number = 0;
    interpolation(input: number, output: number, time: number): number {
        throw new Error("Method not implemented.");
    }
    updateDelta(delta: number): void {
        this.delta = delta / 1000;
        this.time += delta / 1000;
    }
    animate(controller: GLTFAnimationController): void {
        controller.animate(this.time)
    }
}