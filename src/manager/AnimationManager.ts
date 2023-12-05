import CameraAnimator from "../animator/CameraAnimator.js";
import CircleAnimator from "../animator/CircleAnimator.js";
import GLTFAnimator from "../animator/GLTFAnimator.js";
import LinearAnimator from "../animator/LinearAnimator.js";
import OnEntityUpdate from "../observer/OnEntityUpdate.js";
import EventManager from "./EventManager.js";
export default class AnimationManager {
    readonly linearAnimator = new LinearAnimator;
    readonly cameraAnimator = new CameraAnimator;
    readonly circleAnimator = new CircleAnimator;
    readonly gltfAnimator = new GLTFAnimator;
    private eventManager?: EventManager;
    setEventManager(eventManager: EventManager): void {
        this.eventManager = eventManager;
    }
    getEventManager(): EventManager {
        if (this.eventManager === undefined) {
            throw new Error("eventManager is undefined");
        }
        return this.eventManager;
    }

    initObservers() {
        const onEntityUpdate = new OnEntityUpdate;
        onEntityUpdate.setAnimationManager(this);
        onEntityUpdate.setSubject(this.getEventManager().entityUpdate);
    }

}


