import Camera from "../camera/Camera.js";
import { OrthoCamera } from "../camera/OrthoCamera.js";
import { PerspectiveCamera } from "../camera/PerspectiveCamera.js";
import Renderer from "../renderer/Renderer.js";
import DemoScene from "../scene/DemoScene.js";
import Scene from "../scene/Scene.js";
import Manager from "./Manager.js";
import SceneManager from "./SceneManager.js";

export default class CameraManager extends Manager<Camera> {
    private sceneManager?: SceneManager;
    private ready = false;
    init(): void {
        const deviceInfo = this.getDevice().getDeviceInfo();
        [
            OrthoCamera,
            PerspectiveCamera
        ].forEach((ctor) => {
            this.add<Camera>(ctor);
            this.get<Camera>(ctor).setSize(deviceInfo.windowWidth, deviceInfo.windowHeight);
            this.get<Camera>(ctor).init();
        });
    }
    update(): void {
        if (!this.ready) {
            this.getScene().getComponents(Renderer).forEach(renderer => renderer.setCamera(this.get(OrthoCamera)));
            this.ready = true;
        }
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
        return this.getSceneManager().get(DemoScene);
    }
}