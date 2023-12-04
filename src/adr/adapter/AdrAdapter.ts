import SceneManager from "../../manager/SceneManager.js";

export default abstract class AdrAdapter {
    private sceneManager?: SceneManager;
    setSeceneManager(sceneManager: SceneManager): void {
        this.sceneManager = sceneManager;
    }
    getSceneManager(): SceneManager {
        if (this.sceneManager === undefined) {
            throw new Error("sceneManager is undefined");
        }
        return this.sceneManager;
    }
    abstract init(): void;
}