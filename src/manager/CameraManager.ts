import Camera from "../camera/Camera.js";
import { MainCamera } from "../camera/MainCamera.js";
import { FrontgroundCamera } from "../camera/FrontgroundCamera.js";
import { DebugCamera } from "../camera/DebugCamera.js";
import Node from "../transform/Node.js";
import FrustumCube from "../drawobject/FrustumCube.js";
import Renderer from "../renderer/Renderer.js";
import Scene from "../scene/Scene.js";
import Manager from "./Manager.js";
import SceneManager from "./SceneManager.js";
import WireQuad from "../drawobject/WireQuad.js";
import { PointRenderer } from "../renderer/PointRenderer.js";
import FrontgroundFrame from "../wireframe/FrontgroundFrame.js";
import SpriteRenderer from "../renderer/SpriteRenderer.js";
import VisualizeCamera from "../wireframe/VisualizeCamera.js";
import Histogram from "../drawobject/Histogram.js";
import Flowers from "../texturemap/Flowers.js";
import BackgroundFrame from "../wireframe/BackgroundFrame.js";
import { BackgroundCamera } from "../camera/BackgroundCamera.js";
import { UICamera } from "../camera/UICamera.js";
import UIFrame from "../wireframe/UIFrame.js";
import Text from "../drawobject/Text.js";
import DepthMap from "../texturemap/DepthMap.js";
import Sprite from "../drawobject/Sprite.js";
import PickMap from "../texturemap/PickMap.js";
import TimestepManager from "./TimestepManager.js";
import CameraAnimator from "../animator/CameraAnimator.js";
import SingleColorCanvasMap from "../texturemap/SingleColorCanvasMap.js";
import SDFCanvasMap from "../texturemap/SDFCanvasMap.js";
import SDFCharacter from "../drawobject/SDFCharacter.js";
import SDFRenderer from "../renderer/SDFRenderer.js";

export default class CameraManager extends Manager<Camera> {
    private sceneManager?: SceneManager;
    private timestepManager?: TimestepManager;
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
    update(): void {

        this.get(MainCamera).rotateViewPerFrame(this.getTimestepManager().getFrames());
        this.getSceneManager().all().forEach(scene => scene.getComponents(CameraAnimator).forEach(cameraController => this.get(MainCamera).updataEye(cameraController.getEye())));
    }
    init(): void {
        const windowInfo = this.getDevice().getWindowInfo();
        if (this.getSceneManager().all().some(scene => scene.getComponents(FrustumCube).length > 0)) {
            this.getSceneManager().all().forEach(scene => scene.getComponents(Renderer).forEach(renderer => renderer.setCamera(this.get(DebugCamera))));
            this.getSceneManager().all().forEach(scene => scene.getComponents(VisualizeCamera).forEach(component => component.setCamera(this.get(MainCamera))));
            this.getSceneManager().all().forEach(scene => scene.getComponents(VisualizeCamera).filter(comp => comp.getEntity().has(FrontgroundFrame)).forEach(component => component.setCamera(this.get(FrontgroundCamera))));
            this.getSceneManager().all().forEach(scene => scene.getComponents(VisualizeCamera).filter(comp => comp.getEntity().has(BackgroundFrame)).forEach(component => component.setCamera(this.get(BackgroundCamera))));
            this.getSceneManager().all().forEach(scene => scene.getComponents(VisualizeCamera).filter(comp => comp.getEntity().has(UIFrame)).forEach(component => component.setCamera(this.get(UICamera))));
            this.getSceneManager().all().forEach(scene => scene.getComponents(FrontgroundFrame).forEach((obj) => {
                scene.getComponents(SpriteRenderer).filter(comp => !comp.getEntity().has(SingleColorCanvasMap) || !comp.getEntity().has(SDFCanvasMap) || !comp.getEntity().has(Flowers)).forEach(renderer => {
                    renderer.getEntity().get(Node).setParent(obj.getEntity().get(Node));
                });
            }));
            this.getSceneManager().all().forEach(scene => scene.getComponents(BackgroundFrame).forEach((obj) => {
                scene.getComponents(SpriteRenderer).filter(comp => comp.getEntity().has(SingleColorCanvasMap) || comp.getEntity().has(SDFCanvasMap) || comp.getEntity().has(Flowers)).forEach(renderer => {
                    renderer.getEntity().get(Node).setParent(obj.getEntity().get(Node));
                });
                scene.getComponents(SDFRenderer).filter(comp => comp.getEntity().has(SDFCharacter)).forEach(renderer => {
                    renderer.getEntity().get(Node).setParent(obj.getEntity().get(Node));
                });
            }));
            this.getSceneManager().all().forEach(scene => scene.getComponents(WireQuad).forEach((obj) => {
                obj.getEntity().get(WireQuad).updateRect(0, 0, windowInfo.windowWidth, windowInfo.windowHeight);
            }));
        } else {
            this.getSceneManager().all().forEach(scene => scene.getComponents(Renderer).forEach(renderer => renderer.setCamera(this.get(MainCamera))));
            this.getSceneManager().all().forEach(scene => scene.getComponents(Histogram).forEach(comp => comp.getEntity().get(Renderer).setCamera(this.get(UICamera))));
            this.getSceneManager().all().forEach(scene => scene.getComponents(PointRenderer).forEach(comp => comp.getEntity().get(Renderer).setCamera(this.get(UICamera))));
            this.getSceneManager().all().forEach(scene => scene.getComponents(SpriteRenderer).forEach(comp => {
                if (comp.getEntity().has(SingleColorCanvasMap) || comp.getEntity().has(SDFCanvasMap) || comp.getEntity().has(Flowers)) {
                    comp.getEntity().get(Renderer).setCamera(this.get(BackgroundCamera));
                } else if (comp.getEntity().has(Text)) {
                    comp.getEntity().get(Renderer).setCamera(this.get(UICamera));
                } else {
                    comp.getEntity().get(Renderer).setCamera(this.get(FrontgroundCamera));
                }
            }));
            this.getSceneManager().all().forEach(scene => scene.getComponents(SDFRenderer).forEach(comp => {
                comp.getEntity().get(Renderer).setCamera(this.get(UICamera));

            }));

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