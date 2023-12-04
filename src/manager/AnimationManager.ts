import CameraAnimator from "../animator/CameraAnimator.js";
import CircleAnimator from "../animator/CircleAnimator.js";
import GLTFAnimator from "../animator/GLTFAnimator.js";
import LinearAnimator from "../animator/LinearAnimator.js";
import SceneManager from "./SceneManager.js";
export default class AnimationManager {
    private readonly linearAnimator = new LinearAnimator;
    private readonly cameraAnimator = new CameraAnimator;
    private readonly circleAnimator = new CircleAnimator;
    private readonly gltfAnimator = new GLTFAnimator;
    private sceneManager?: SceneManager;
    initAnimator() {
        this.linearAnimator.setSceneManager(this.getSceneManager());
        this.cameraAnimator.setSceneManager(this.getSceneManager());
        this.circleAnimator.setSceneManager(this.getSceneManager());
        this.gltfAnimator.setSceneManager(this.getSceneManager());
    }

    animate(): void {
        this.linearAnimator.animate();
        this.cameraAnimator.animate();
        this.circleAnimator.animate();
        this.gltfAnimator.animate();
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
}


