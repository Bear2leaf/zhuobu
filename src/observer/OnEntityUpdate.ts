import AnimationController from "../controller/AnimationController.js";
import GLTFAnimationController from "../controller/GLTFAnimationController.js";
import MoveCircleController from "../controller/MoveCircleController.js";
import AdrText from "../drawobject/AdrText.js";
import DrawObject from "../drawobject/DrawObject.js";
import Mesh from "../drawobject/Mesh.js";
import Pointer from "../drawobject/Pointer.js";
import AdrManager from "../manager/AdrManager.js";
import AnimationManager from "../manager/AnimationManager.js";
import EntitySubject from "../subject/EntitySubject.js";
import Node from "../transform/Node.js";
import Observer from "./Observer.js";

export default class OnEntityUpdate extends Observer {

    private animationManager?: AnimationManager;
    private adrManager?: AdrManager;
    setAdrManager(adrManager: AdrManager) {
        this.adrManager = adrManager;
    }
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
    public notify(): void {
        const entity = this.getSubject().getEntity();
        if (entity.has(Mesh)) {
            entity.get(Mesh).update();
        }
        if (entity.has(AnimationController) && this.animationManager) {
            entity.get(AnimationController).update();
            if (entity.has(GLTFAnimationController)) {
                this.animationManager.gltfAnimator.animate(entity.get(GLTFAnimationController));
            } else if (entity.has(MoveCircleController)) {
                this.animationManager.circleAnimator.animate(entity.get(MoveCircleController));
            }
        }
        if (entity.has(Pointer)) {
            entity.get(Pointer).update();
        }
        if (entity.has(AdrText) && this.adrManager) {
            if (entity.get(Node).getRoot() === entity.get(Node)) {
                entity.get(Node).updateWorldMatrix();
            }
        }
    }

}
