import Scene from "../scene/Scene.js";
import Manager from "./Manager.js";
import SceneManager from "./SceneManager.js";
import Engine from "../adr/engine.js";

export default class AdrManager extends Manager<Object> {
    private sceneManager?: SceneManager;
    addObjects(): void {
    }
    async load(): Promise<void> {

    }
    init(): void {
        Engine.createDefaultElements();
        Engine.init();
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
    getScene(): Scene {
        return this.getSceneManager().first();
    }
    update(): void {
    }

}