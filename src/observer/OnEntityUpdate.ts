import AnimationController from "../controller/AnimationController.js";
import GLTFAnimationController from "../controller/GLTFAnimationController.js";
import MoveCircleController from "../controller/MoveCircleController.js";
import AdrRoot from "../drawobject/AdrRoot.js";
import HeText from "../drawobject/HeText.js";
import Mesh from "../drawobject/Mesh.js";
import Pointer from "../drawobject/Pointer.js";
import SDFCharacter from "../drawobject/SDFCharacter.js";
import SkinMesh from "../drawobject/SkinMesh.js";
import WhaleMesh from "../drawobject/WhaleMesh.js";
import AnimationManager from "../manager/AnimationManager.js";
import EntitySubject from "../subject/EntitySubject.js";
import Observer from "./Observer.js";

export default class OnEntityUpdate extends Observer {
    private animationManager?: AnimationManager;
    getSubject(): EntitySubject {
        const subject = super.getSubject();
        if (subject instanceof EntitySubject) {
            return subject;
        } else {
            throw new Error("subject is not EntitySubject!");
        }
    }

    setAnimationManager(animationManager: AnimationManager) {
        this.animationManager = animationManager;
    }
    getAnimationManager(): AnimationManager {
        if (this.animationManager) {
            return this.animationManager;
        } else {
            throw new Error("RendererManager not set!");
        }
    }
    public notify(): void {
        const entity = this.getSubject().getEntity();
        if (entity.has(Mesh)) {
            entity.get(Mesh).update();
        }
        if (entity.has(AnimationController)) {
            entity.get(AnimationController).update();
            if (entity.has(GLTFAnimationController)) {
                this.getAnimationManager().gltfAnimator.animate(entity.get(GLTFAnimationController));
            } else if (entity.has(MoveCircleController)) {
                this.getAnimationManager().circleAnimator.animate(entity.get(MoveCircleController));
            }
        } else if (entity.has(Pointer)) {
            entity.get(Pointer).update();
        } else if (entity.has(AdrRoot)) {
            entity.get(AdrRoot).update();
        }
    }

}
