import SceneManager from "../manager/SceneManager.js";

export default class Animator  {
    private sceneManager?: SceneManager;
    animate(): void {
        throw new Error("Method not implemented.");
    }
    setSceneManager(sceneManager: SceneManager) {
        this.sceneManager = sceneManager;
    }
    getSceneManager(): SceneManager {
        if (!this.sceneManager) {
            throw new Error("scene manager not exist");
        }
        return this.sceneManager;
    }
}