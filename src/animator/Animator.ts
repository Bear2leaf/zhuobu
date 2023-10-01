import GLTFAnimationController from "../component/GLTFAnimationController.js";

export default class Animator {
    private time: number = 0;
    updateTime(time: number): void {
        this.time = time;
    }
    animate(controller: GLTFAnimationController): void {
        controller.animate(this.time / 1000)
    }
}