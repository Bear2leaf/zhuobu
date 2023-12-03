import MoveCircleController from "../controller/MoveCircleController.js";
import TRS from "../transform/TRS.js";
import Animator from "./Animator.js";


export default class CircleAnimator extends Animator {

    animate(): void {
        this.getSceneManager().first().getComponents(MoveCircleController).forEach(controller => {
            const time = controller.getTime() / 500;
            controller.getEntity().get(TRS).getPosition().x = Math.sin(time) * 150 + 150;
            controller.getEntity().get(TRS).getPosition().y = Math.cos(time) * 150 + 150;
        });
    }
}