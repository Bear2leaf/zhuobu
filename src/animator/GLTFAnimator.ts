import GLTFAnimationController from "../controller/GLTFAnimationController.js";
import Animator from "./Animator.js";


export default class GLTFAnimator extends Animator {
    animate(): void {
        this.getSceneManager().first().getComponents(GLTFAnimationController).forEach(controller => {
            controller.animGLTF();
        });
    }

}