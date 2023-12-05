import CameraController from "../controller/CameraController.js";
import TRS from "../transform/TRS.js";
import Animator from "./Animator.js";

export default class CameraAnimator extends Animator {
    animate(): void {
        // this.getSceneManager().first().getComponents(CameraController).forEach(controller => {
        //     controller.getEntity().get(TRS).getPosition().set(2, 5, 10 * Math.sin(controller.getTime() / 1000));
        // });
    }
}