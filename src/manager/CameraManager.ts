import Camera from "../camera/Camera.js";
import { MainCamera } from "../camera/MainCamera.js";
import { FrontgroundCamera } from "../camera/FrontgroundCamera.js";
import { DebugCamera } from "../camera/DebugCamera.js";
import Node from "../component/Node.js";
import FrustumCube from "../drawobject/FrustumCube.js";
import Renderer from "../renderer/Renderer.js";
import Scene from "../scene/Scene.js";
import Manager from "./Manager.js";
import SceneManager from "./SceneManager.js";
import WireQuad from "../drawobject/WireQuad.js";
import { PointRenderer } from "../renderer/PointRenderer.js";
import FrontgroundFrame from "../component/FrontgroundFrame.js";
import SpriteRenderer from "../renderer/SpriteRenderer.js";
import VisualizeCamera from "../component/VisualizeCamera.js";
import Histogram from "../drawobject/Histogram.js";
import Flowers from "../component/Flowers.js";
import BackgroundFrame from "../component/BackgroundFrame.js";
import { BackgroundCamera } from "../camera/BackgroundCamera.js";
import { UICamera } from "../camera/UICamera.js";
import UIFrame from "../component/UIFrame.js";
import Text from "../drawobject/Text.js";
import DepthMap from "../component/DepthMap.js";
import Sprite from "../drawobject/Sprite.js";

export default class CameraManager extends Manager<Camera> {
    private sceneManager?: SceneManager;
    addObjects(): void {
        const deviceInfo = this.getDevice().getWindowInfo()
        const windowWidth = deviceInfo.windowWidth;
        const windowHeight = deviceInfo.windowHeight;
        [
            DebugCamera,
            MainCamera,
            UICamera,
            FrontgroundCamera,
            BackgroundCamera
        ].forEach((ctor) => {
            this.add<Camera>(ctor);
            this.get<Camera>(ctor).setSize(windowWidth, windowHeight);
            this.get<Camera>(ctor).init();
        });
    }
    async load(): Promise<void> { }
    update(): void { }
    init(): void {
        const windowInfo = this.getDevice().getWindowInfo();
        if (this.getAllScene().some(scene => scene.getComponents(FrustumCube).length > 0) ){
            this.getAllScene().forEach(scene => scene.getComponents(Renderer).forEach(renderer => renderer.setCamera(this.get(DebugCamera))));
            this.getAllScene().forEach(scene => scene.getComponents(VisualizeCamera).forEach(component => component.setCamera(this.get(MainCamera))));
            this.getAllScene().forEach(scene => scene.getComponents(VisualizeCamera).filter(comp => comp.getEntity().has(FrontgroundFrame)).forEach(component => component.setCamera(this.get(FrontgroundCamera))));
            this.getAllScene().forEach(scene => scene.getComponents(VisualizeCamera).filter(comp => comp.getEntity().has(BackgroundFrame)).forEach(component => component.setCamera(this.get(BackgroundCamera))));
            this.getAllScene().forEach(scene => scene.getComponents(VisualizeCamera).filter(comp => comp.getEntity().has(UIFrame)).forEach(component => component.setCamera(this.get(UICamera))));
            this.getAllScene().forEach(scene => scene.getComponents(FrontgroundFrame).forEach((obj) => {
                scene.getComponents(SpriteRenderer).filter(comp => !comp.getEntity().has(Flowers)).forEach(renderer => {
                    renderer.getEntity().get(Node).setParent(obj.getEntity().get(Node));
                });
            }));
            this.getAllScene().forEach(scene => scene.getComponents(BackgroundFrame).forEach((obj) => {
                scene.getComponents(SpriteRenderer).filter(comp => comp.getEntity().has(Flowers)).forEach(renderer => {
                    renderer.getEntity().get(Node).setParent(obj.getEntity().get(Node));
                });
            }));
            this.getAllScene().forEach(scene => scene.getComponents(WireQuad).forEach((obj) => {
                obj.getEntity().get(WireQuad).updateRect(0, 0, windowInfo.windowWidth, windowInfo.windowHeight);
            }));
        } else {
            this.getAllScene().forEach(scene => scene.getComponents(Renderer).forEach(renderer => renderer.setCamera(this.get(MainCamera))));
            this.getAllScene().forEach(scene => scene.getComponents(Histogram).forEach(comp => comp.getEntity().get(Renderer).setCamera(this.get(UICamera))));
            this.getAllScene().forEach(scene => scene.getComponents(PointRenderer).forEach(comp => comp.getEntity().get(Renderer).setCamera(this.get(UICamera))));
            this.getAllScene().forEach(scene => scene.getComponents(SpriteRenderer).forEach(comp => {
                if (comp.getEntity().has(Flowers)) {
                    comp.getEntity().get(Renderer).setCamera(this.get(BackgroundCamera));
                } else if (comp.getEntity().has(Text)) {
                    comp.getEntity().get(Renderer).setCamera(this.get(UICamera));
                } else {
                    comp.getEntity().get(Renderer).setCamera(this.get(FrontgroundCamera));
                }
            }));

        }
        this.getAllScene().forEach(scene => scene.getComponents(DepthMap).forEach(comp => comp.getEntity().get(Sprite).updateRect(0, 0, windowInfo.windowWidth, windowInfo.windowHeight)));
        this.getAllScene().forEach(scene => scene.getComponents(Flowers).forEach(comp => comp.getEntity().get(Sprite).updateRect(0, 0, windowInfo.windowWidth, windowInfo.windowHeight)));

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
    getAllScene(): Scene[] {
        return this.getSceneManager().all();
    }
}