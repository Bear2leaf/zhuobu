import Camera from "../camera/Camera.js";
import { MainCamera } from "../camera/MainCamera.js";
import { FrontgroundCamera } from "../camera/FrontgroundCamera.js";
import { DebugCamera } from "../camera/DebugCamera.js";
import Scene from "../scene/Scene.js";
import Manager from "./Manager.js";
import SceneManager from "./SceneManager.js";
import { BackgroundCamera } from "../camera/BackgroundCamera.js";
import { UICamera } from "../camera/UICamera.js";
import TimestepManager from "./TimestepManager.js";
import CameraAnimator from "../animator/CameraAnimator.js";
import DrawObject from "../drawobject/DrawObject.js";

export default class CameraManager extends Manager<Camera> {
    private sceneManager?: SceneManager;
    private timestepManager?: TimestepManager;
    addObjects(): void {
        [
            DebugCamera,
            MainCamera,
            UICamera,
            FrontgroundCamera,
            BackgroundCamera
        ].forEach((ctor) => {
            this.add<Camera>(ctor);
        });
    }
    async load(): Promise<void> { }
    update(): void {

        this.getSceneManager().all().forEach(scene => scene.getComponents(CameraAnimator).forEach(cameraController => this.get(MainCamera).updataEye(cameraController.getEye())));
    }
    init(): void {
        const deviceInfo = this.getDevice().getWindowInfo()
        const windowWidth = deviceInfo.windowWidth;
        const windowHeight = deviceInfo.windowHeight;
        this.all().forEach(camera => {
            camera.setSize(windowWidth, windowHeight);
            camera.init();
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
    getTimestepManager(): TimestepManager {
        if (this.timestepManager === undefined) {
            throw new Error("timestepManager is undefined");
        }
        return this.timestepManager;
    }
    setTimestepManager(timestepManager: TimestepManager) {
        this.timestepManager = timestepManager;
    }
    getScene(): Scene {
        return this.getSceneManager().first();
    }
}