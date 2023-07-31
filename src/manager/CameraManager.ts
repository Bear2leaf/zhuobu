import Camera from "../camera/Camera.js";
import { MainCamera } from "../camera/MainCamera.js";
import { UICamera } from "../camera/UICamera.js";
import { TestCamera } from "../camera/TestCamera.js";
import Node from "../component/Node.js";
import CameraCube from "../drawobject/CameraCube.js";
import CameraLenCone from "../drawobject/CameraLenCone.js";
import CameraUpCube from "../drawobject/CameraUpCube.js";
import FrustumCube from "../drawobject/FrustumCube.js";
import { Vec4 } from "../math/Vector.js";
import Renderer from "../renderer/Renderer.js";
import Scene from "../scene/Scene.js";
import Manager from "./Manager.js";
import SceneManager from "./SceneManager.js";
import WireQuad from "../drawobject/WireQuad.js";
import TRS from "../component/TRS.js";
import { PointRenderer } from "../renderer/PointRenderer.js";
import { TriangleRenderer } from "../renderer/TriangleRenderer.js";
import FrontgroundFrame from "../component/FrontgroundFrame.js";
import BackgroundFrame from "../component/BackgroundFrame.js";
import SpriteRenderer from "../renderer/SpriteRenderer.js";
import UIFrame from "../component/UIFrame.js";

export default class CameraManager extends Manager<Camera> {
    private sceneManager?: SceneManager;
    addObjects(): void {
        const deviceInfo = this.getDevice().getWindowInfo()
        const windowWidth = deviceInfo.windowWidth;
        const windowHeight = deviceInfo.windowHeight;
        [
            TestCamera,
            MainCamera,
            UICamera
        ].forEach((ctor) => {
            this.add<Camera>(ctor);
            this.get<Camera>(ctor).setSize(windowWidth, windowHeight);
            this.get<Camera>(ctor).init();
        });
    }
    async load(): Promise<void> {

    }

    init(): void {
        this.getScene().getComponents(FrustumCube).forEach(cube => cube.getEntity().get(Node).updateWorldMatrix(this.get(MainCamera).getFrustumTransformMatrix()));
        this.getScene().getComponents(CameraCube).forEach(obj => obj.getEntity().get(Node).updateWorldMatrix(this.get(MainCamera).getViewInverse().translate(new Vec4(0, 0, 1, 1)).scale(new Vec4(0.25, 0.25, 0.25, 1))));
        this.getScene().getComponents(CameraLenCone).forEach(obj => obj.getEntity().get(Node).updateWorldMatrix(this.get(MainCamera).getViewInverse().translate(new Vec4(0, 0, 0.5, 1)).scale(new Vec4(0.25, 0.25, 0.25, 1))));
        this.getScene().getComponents(CameraUpCube).forEach(obj => obj.getEntity().get(Node).updateWorldMatrix(this.get(MainCamera).getViewInverse().translate(new Vec4(0, 0.5, 1, 1)).scale(new Vec4(0.1, 0.1, 0.1, 1))));
        this.getScene().getComponents(WireQuad).forEach((obj) => {
            obj.getEntity().get(Node).setSource(obj.getEntity().get(TRS));
        });
        this.getScene().getComponents(TriangleRenderer).forEach((renderer) => {
            renderer.getEntity().get(Node).setSource(renderer.getEntity().get(TRS));
        });
        this.getScene().getComponents(FrontgroundFrame).forEach((obj) => {
            this.getScene().getComponents(SpriteRenderer).forEach(renderer => {
                renderer.getEntity().get(Node).setParent(obj.getEntity().get(Node));
            });
        });
        if (this.hasFrustumCube()) {
            this.getScene().getComponents(Renderer).forEach(renderer => renderer.setCamera(this.get(TestCamera)));
        } else {
            this.getScene().getComponents(Renderer).forEach(renderer => renderer.setCamera(this.get(MainCamera)));
            this.getScene().getComponents(TriangleRenderer).forEach(renderer => renderer.setCamera(this.get(UICamera)));
            this.getScene().getComponents(PointRenderer).forEach(renderer => renderer.setCamera(this.get(UICamera)));
            this.getScene().getComponents(SpriteRenderer).forEach(renderer => renderer.setCamera(this.get(UICamera)));
        }

    }
    hasFrustumCube() {
        return this.getScene().getComponents(FrustumCube).length > 0;
    }
    update(): void {
        this.getScene().getComponents(SpriteRenderer).forEach((renderer) => {
            renderer.getEntity().get(Node).updateWorldMatrix();
        });
        this.getScene().getComponents(TriangleRenderer).forEach((renderer) => {
            renderer.getEntity().get(Node).updateWorldMatrix();
        });
        this.getScene().getComponents(WireQuad).forEach((obj) => {
            const windowInfo = this.getDevice().getWindowInfo();
            obj.getEntity().get(WireQuad).updateQuad(0, 0, windowInfo.windowWidth, windowInfo.windowHeight);
        });
        this.getScene().getComponents(FrontgroundFrame).forEach((obj) => {
            obj.getEntity().get(Node).updateWorldMatrix(this.get(MainCamera).getViewInverse());
        });
        this.getScene().getComponents(BackgroundFrame).forEach((obj) => {
            obj.getEntity().get(Node).updateWorldMatrix(this.get(MainCamera).getViewInverse());
        });
        this.getScene().getComponents(UIFrame).forEach((obj) => {
            obj.getEntity().get(Node).updateWorldMatrix(this.get(MainCamera).getViewInverse());
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