import CameraController from "../controller/CameraController.js";
import Animator from "./Animator.js";

export default class CameraAnimator extends Animator {
   
    animate(controller: CameraController): void {
        controller.updateCamera(0.02);
    }
}