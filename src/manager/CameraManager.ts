import Camera from "../camera/Camera.js";
import { MainCamera } from "../camera/MainCamera.js";
import { OrthoCamera } from "../camera/OrthoCamera.js";
import { TestCamera } from "../camera/TestCamera.js";
import Node from "../component/Node.js";
import FrustumCube from "../drawobject/FrustumCube.js";
import GLTFMeshRenderer from "../renderer/GLTFMeshRenderer.js";
import GLTFSkinMeshRenderer from "../renderer/GLTFSkinMeshRenderer.js";
import { LineRenderer } from "../renderer/LineRenderer.js";
import Renderer from "../renderer/Renderer.js";
import Scene from "../scene/Scene.js";
import Manager from "./Manager.js";
import SceneManager from "./SceneManager.js";

export default class CameraManager extends Manager<Camera> {
    private sceneManager?: SceneManager;
    addObjects(): void {
        const deviceInfo = this.getDevice().getWindowInfo()
        const windowWidth = deviceInfo.windowWidth;
        const windowHeight = deviceInfo.windowHeight;
        [
            TestCamera,
            MainCamera,
            OrthoCamera
        ].forEach((ctor) => {
            this.add<Camera>(ctor);
            this.get<Camera>(ctor).setSize(windowWidth, windowHeight);
            this.get<Camera>(ctor).init();
        });
    }
    async load(): Promise<void> {

    }
    
    init(): void {
        let camCtor = MainCamera;
        if (this.hasCameraCube()) {
            camCtor = TestCamera;
        }
        this.getScene().getComponents(Renderer).forEach(renderer => renderer.setCamera(this.get(OrthoCamera)));
        this.getScene().getComponents(LineRenderer).forEach(renderer => renderer.setCamera(this.get(camCtor)));
        this.getScene().getComponents(GLTFMeshRenderer).forEach(renderer => renderer.setCamera(this.get(camCtor)));
        this.getScene().getComponents(GLTFSkinMeshRenderer).forEach(renderer => renderer.setCamera(this.get(camCtor)));
        
    }
    hasCameraCube() {
        return this.getScene().getComponents(FrustumCube).length > 0;
    }
    update(): void {
        this.getScene().getComponents(FrustumCube).forEach(cube => cube.getEntity().get(Node).updateWorldMatrix(this.get(MainCamera).getFrustumTransformMatrix()));

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