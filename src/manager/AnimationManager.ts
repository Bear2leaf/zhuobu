import CameraAnimator from "../animator/CameraAnimator.js";
import CircleAnimator from "../animator/CircleAnimator.js";
import GLTFAnimator from "../animator/GLTFAnimator.js";
import LinearAnimator from "../animator/LinearAnimator.js";
import CameraController from "../controller/CameraController.js";
import GLTFAnimationController from "../controller/GLTFAnimationController.js";
import MoveCircleController from "../controller/MoveCircleController.js";
import Entity from "../entity/Entity.js";
import CameraManager from "./CameraManager.js";
import EventManager from "./EventManager.js";
export default class AnimationManager {
    private cameraManager?: CameraManager;
    readonly linearAnimator = new LinearAnimator;
    readonly cameraAnimator = new CameraAnimator;
    readonly circleAnimator = new CircleAnimator;
    readonly gltfAnimator = new GLTFAnimator;
    private eventManager?: EventManager;
    setEventManager(eventManager: EventManager) {
        this.eventManager = eventManager;
    }
    getEventManager(): EventManager {
        if (this.eventManager === undefined) {
            throw new Error("eventManager is undefined");
        }
        return this.eventManager;
    }
    initObservers() {
        this.getEventManager().onEntityUpdate.animateEntity = this.animateEntity.bind(this);
    }
    animateEntity(entity: Entity) {
        if (entity.has(GLTFAnimationController)) {
            this.gltfAnimator.animate(entity.get(GLTFAnimationController));
        } else if (entity.has(MoveCircleController)) {
            this.circleAnimator.animate(entity.get(MoveCircleController));
        } else if (entity.has(CameraController)) {
            entity.get(CameraController).setCamera(this.getCameraManager().getMainCamera());
            this.cameraAnimator.animate(entity.get(CameraController));
        }
    }
    getCameraManager(): CameraManager {
        if (this.cameraManager === undefined) {
            throw new Error("cameraManager is undefined");
        }
        return this.cameraManager;
    }
    setCameraManager(cameraManager: CameraManager) {
        this.cameraManager = cameraManager;
    }

}


