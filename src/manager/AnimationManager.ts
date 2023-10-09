import Animator from "../animator/Animator.js";
import CameraAnimator from "../animator/CameraAnimator.js";
import CircleAnimator from "../animator/CircleAnimator.js";
import GLTFSkeletonAnimator from "../animator/GLTFSkeletonAnimator.js";
import LinearAnimator from "../animator/LinearAnimator.js";
import Scene from "../scene/Scene.js";
import Manager from "./Manager.js";
import SceneManager from "./SceneManager.js";
import TimestepManager from "./TimestepManager.js";
export default class AnimationManager extends Manager<Animator> {
    private sceneManager?: SceneManager;
    private timestepManager?: TimestepManager;
    addObjects(): void {
        [
            LinearAnimator,
            CameraAnimator,
            CircleAnimator,
            GLTFSkeletonAnimator
        ].forEach(ctor => {
            this.add<Animator>(ctor);
        });
    }
    async load(): Promise<void> {

    }
    init() {

    }

    update(): void {
        this.getSceneManager().all().forEach(scene => scene.getComponents(Animator).forEach(animator => {
            this.ctors().forEach(animatorCtor => {
                if (animator instanceof animatorCtor) {
                    animator.setTime(this.getTimestepManager().now());
                }
            });
        }));
    }

    getSceneManager(): SceneManager {
        if (this.sceneManager === undefined) {
            throw new Error("sceneManager is undefined");
        }
        return this.sceneManager;
    }
    setSceneManager(sceneManager: SceneManager) {
        this.sceneManager = sceneManager;
    }
    setTimestepManager(timestepManager: TimestepManager) {
        this.timestepManager = timestepManager;
    }
    getTimestepManager(): TimestepManager {
        if (this.timestepManager === undefined) {
            throw new Error("timestepManager is undefined");
        }
        return this.timestepManager;
    }
    getScene(): Scene {
        return this.getSceneManager().first();
    }
}


