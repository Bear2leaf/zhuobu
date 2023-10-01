import Animator from "../animator/Animator.js";
import LinearAnimator from "../animator/LinearAnimator.js";
import GLTFAnimationController from "../component/GLTFAnimationController.js";
import Scene from "../scene/Scene.js";
import Manager from "./Manager.js";
import SceneManager from "./SceneManager.js";
import TimestepManager from "./TimestepManager.js";
export default class AnimationManager extends Manager<Animator> {
    private sceneManager?: SceneManager;
    private timestepManager?: TimestepManager;
    addObjects(): void {
        [
            LinearAnimator
        ].forEach(ctor => {
            this.add<Animator>(ctor);
        });
    }
    async load(): Promise<void> {

    }
    init() {

    }

    update(): void {
        this.all().forEach(clip => clip.updateTime(this.getTimestepManager().now()))
        this.all().forEach(clip => {
            this.getSceneManager().all().map(scene => {
                scene.getComponents(GLTFAnimationController).forEach(controller => clip.animate(controller));
            })
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
    getScene(): Scene {
        return this.getSceneManager().first();
    }
}


