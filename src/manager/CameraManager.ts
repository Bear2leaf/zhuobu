import Camera from "../camera/Camera.js";
import { MainCamera } from "../camera/MainCamera.js";
import { OrthoCamera } from "../camera/OrthoCamera.js";
import { DebugCamera } from "../camera/DebugCamera.js";
import Node from "../component/Node.js";
import FrustumCube from "../drawobject/FrustumCube.js";
import Renderer from "../renderer/Renderer.js";
import Scene from "../scene/Scene.js";
import Manager from "./Manager.js";
import SceneManager from "./SceneManager.js";
import WireQuad from "../drawobject/WireQuad.js";
import { PointRenderer } from "../renderer/PointRenderer.js";
import { VertexColorTriangleRenderer } from "../renderer/VertexColorTriangleRenderer.js";
import FrontgroundFrame from "../component/FrontgroundFrame.js";
import SpriteRenderer from "../renderer/SpriteRenderer.js";
import VisualizeCamera from "../component/VisualizeCamera.js";

export default class CameraManager extends Manager<Camera> {
    private sceneManager?: SceneManager;
    addObjects(): void {
        const deviceInfo = this.getDevice().getWindowInfo()
        const windowWidth = deviceInfo.windowWidth;
        const windowHeight = deviceInfo.windowHeight;
        [
            DebugCamera,
            MainCamera,
            OrthoCamera
        ].forEach((ctor) => {
            this.add<Camera>(ctor);
            this.get<Camera>(ctor).setSize(windowWidth, windowHeight);
            this.get<Camera>(ctor).init();
        });
    }
    async load(): Promise<void> { }
    update(): void { }
    init(): void {
        if (this.hasFrustumCube()) {
            this.getScene().getComponents(Renderer).forEach(renderer => renderer.setCamera(this.get(DebugCamera)));
            this.getScene().getComponents(VisualizeCamera).forEach(component => component.setMainCamera(this.get(MainCamera)));
            this.getScene().getComponents(FrontgroundFrame).forEach((obj) => {
                this.getScene().getComponents(SpriteRenderer).forEach(renderer => {
                    renderer.getEntity().get(Node).setParent(obj.getEntity().get(Node));
                });
            });
            this.getScene().getComponents(WireQuad).forEach((obj) => {
                const windowInfo = this.getDevice().getWindowInfo();
                obj.getEntity().get(WireQuad).updateRect(0, 0, windowInfo.windowWidth, windowInfo.windowHeight);
            });
        } else {
            this.getScene().getComponents(Renderer).forEach(renderer => renderer.setCamera(this.get(MainCamera)));
            this.getScene().getComponents(VertexColorTriangleRenderer).forEach(renderer => renderer.setCamera(this.get(OrthoCamera)));
            this.getScene().getComponents(PointRenderer).forEach(renderer => renderer.setCamera(this.get(OrthoCamera)));
            this.getScene().getComponents(SpriteRenderer).forEach(renderer => renderer.setCamera(this.get(OrthoCamera)));
        }
    }
    hasFrustumCube() {
        return this.getScene().getComponents(FrustumCube).length > 0;
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