import Camera from "../camera/Camera.js";
import { MainCamera } from "../camera/MainCamera.js";
import { UICamera } from "../camera/UICamera.js";
import Scene from "../scene/Scene.js";
import Manager from "./Manager.js";
import SceneManager from "./SceneManager.js";
import WireQuad from "../drawobject/WireQuad.js";

export default class LayoutManager extends Manager<Camera> {
    private sceneManager?: SceneManager;
    addObjects(): void {
    }
    async load(): Promise<void> {

    }

    init(): void {
    }
    update(): void {
        this.getScene().getComponents(WireQuad).forEach(obj => {
            const windowInfo = this.getDevice().getWindowInfo();
            obj.updateQuad(0, 0, windowInfo.windowWidth, windowInfo.windowHeight);
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
    getScene(): Scene {
        return this.getSceneManager().first();
    }
}