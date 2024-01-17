import PickFrameBufferObject from "../framebuffer/PickFrameBufferObject.js";
import WorkerManager from "../manager/WorkerManager.js";
import UIScene from "../scene/UIScene.js";
import InputSubject from "./InputSubject.js";

export default class ClickPickSubject extends InputSubject {
    private frameBufferObject?: PickFrameBufferObject;
    private uiScene?: UIScene;
    private workerManager?: WorkerManager;
    setUIScene(uiScene: UIScene) {
        this.uiScene = uiScene;
    }
    getUIScene() {
        if (!this.uiScene) throw new Error("uiScene is not set!");
        return this.uiScene;
    }
    getFrameBufferObject() {
        if (!this.frameBufferObject) throw new Error("frameBufferObject is not set!");
        return this.frameBufferObject;
    }
    setFrameBufferObject(frameBufferObject: PickFrameBufferObject) {
        this.frameBufferObject = frameBufferObject;
    }
    setWorkerManager(workerManager: WorkerManager) {
        this.workerManager = workerManager;
    }
    getWorkerManager() {
        if (!this.workerManager) throw new Error("workerManager is not set!");
        return this.workerManager;
    }
}
