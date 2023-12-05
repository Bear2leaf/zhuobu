import GLTFAnimationController from "../controller/GLTFAnimationController.js";
import Animator from "./Animator.js";


export default class GLTFAnimator extends Animator {
    animate(controller: GLTFAnimationController): void {
        controller.animGLTF();
    }

}