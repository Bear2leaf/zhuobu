import Animator from "../animator/Animator.js";
import CameraAnimator from "../animator/CameraAnimator.js";
import CircleAnimator from "../animator/CircleAnimator.js";
import GLTFAnimator from "../animator/GLTFAnimator.js";
import LinearAnimator from "../animator/LinearAnimator.js";
import Manager from "./Manager.js";
import SceneManager from "./SceneManager.js";
import TimestepManager from "./TimestepManager.js";
export default class AnimationManager extends Manager<Animator> {
    private sceneManager?: SceneManager;
    private timestepManager?: TimestepManager;
    addObjects(): void {
        const ctors: (new () => Animator)[] = [
            LinearAnimator,
            CameraAnimator,
            CircleAnimator,
            GLTFAnimator
        ];
        ctors.forEach(ctor => {
            this.add<Animator>(ctor);
        });
    }
    async load(): Promise<void> {

    }
    init() {
        this.all().forEach(animator => {
            animator.setSceneManager(this.getSceneManager());
        });
    }

    update(): void {
        this.all().forEach(animator => {
            animator.animate();
        });
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
}


