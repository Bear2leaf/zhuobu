import Camera from "../camera/Camera.js";
import { OrthoCamera } from "../camera/OrthoCamera.js";
import { PerspectiveCamera } from "../camera/PerspectiveCamera.js";
import Node from "../component/Node.js";
import GLTFMeshRenderer from "../renderer/GLTFMeshRenderer.js";
import GLTFSkinMeshRenderer from "../renderer/GLTFSkinMeshRenderer.js";
import Renderer from "../renderer/Renderer.js";
import DemoScene from "../scene/DemoScene.js";
import Scene from "../scene/Scene.js";
import Manager from "./Manager.js";
import SceneManager from "./SceneManager.js";

export default class CameraManager extends Manager<Camera> {
    private sceneManager?: SceneManager;
    addObjects(): void {
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
    async load(): Promise<void> {

    }
    init(): void {
        this.getScene().getComponents(Renderer).forEach(renderer => renderer.setCamera(this.get(OrthoCamera)));
        this.getScene().getComponents(GLTFMeshRenderer).forEach(renderer => renderer.getEntity().get(GLTFMeshRenderer).setCamera(this.get(PerspectiveCamera)));
        this.getScene().getComponents(GLTFSkinMeshRenderer).forEach(renderer => renderer.getEntity().get(GLTFSkinMeshRenderer).setCamera(this.get(PerspectiveCamera)));
        console.log("CameraManager init");
    }
    update(): void {

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