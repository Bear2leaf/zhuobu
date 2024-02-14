import { MainCamera } from "../camera/MainCamera.js";
import { FrontgroundCamera } from "../camera/FrontgroundCamera.js";
import { DebugCamera } from "../camera/DebugCamera.js";
import { BackgroundCamera } from "../camera/BackgroundCamera.js";
import { UICamera } from "../camera/UICamera.js";
import Device from "../device/Device.js";
import TerrainMesh from "../drawobject/TerrainMesh.js";
import EventManager from "./EventManager.js";

export default class CameraManager {
    private readonly debugCamera = new DebugCamera;
    private readonly mainCamera = new MainCamera;
    private readonly uiCamera = new UICamera;
    private readonly frontgroundCamera = new FrontgroundCamera;
    private readonly backgroundCamera = new BackgroundCamera;
    private device?: Device;
    async load(): Promise<void> { }
    private eventManager?: EventManager;
    setEventManager(eventManager: EventManager) {
        this.eventManager = eventManager;
    }
    getEventManager(): EventManager {
        if (this.eventManager === undefined) {
            throw new Error("eventManager is undefined");
        }
        return this.eventManager;
    }
    initObservers() {
        this.getEventManager().onEntityUpdate.updateTerrainMesh = this.updateTerrainMesh.bind(this);
    }
    setDevice(device: Device) {
        this.device = device;
    }
    getDevice(): Device {
        if (!this.device) throw new Error("Device not set");
        return this.device;
    }
    initCamera(): void {
        const device = this.getDevice();
        const windowWidth = device.getWindowInfo().windowWidth;
        const windowHeight = device.getWindowInfo().windowHeight;
        this.debugCamera.setSize(windowWidth, windowHeight);
        this.mainCamera.setSize(windowWidth, windowHeight);
        this.uiCamera.setSize(windowWidth, windowHeight);
        this.frontgroundCamera.setSize(windowWidth, windowHeight);
        this.backgroundCamera.setSize(windowWidth, windowHeight);
        this.debugCamera.init();
        this.mainCamera.init();
        this.uiCamera.init();
        this.frontgroundCamera.init();
        this.backgroundCamera.init();
    }

    updateTerrainMesh(terrainMesh: TerrainMesh) {
        const gltf = terrainMesh.getGLTF();
        const cameraNode = gltf.getNodeByName("Camera");
        if (!cameraNode) {
            throw new Error("camera node not found");
        }
        const camera = gltf.getCameraByIndex(cameraNode.getCamera());
        const cameraTarget = gltf.getCameraTarget();
        const aspect = camera.getPerspective().getAspectRatio();
        const fov = camera.getPerspective().getYFov();
        const near = camera.getPerspective().getZNear();
        const far = camera.getPerspective().getZFar();

        const trs = cameraNode.getNode().getSource();
        if (!trs) {
            throw new Error("trs not found");
        }
        const targetSource = cameraTarget.getNode().getSource();
        if (!targetSource) {
            throw new Error("targetSource not found");
        }
        this.getMainCamera().fromGLTF(targetSource.getPosition(), trs.getPosition(), fov, near, far);
        this.getEventManager().cameraFovChange.fov = fov;
        this.getEventManager().cameraFovChange.notify();
    }
    getMainCamera() { return this.mainCamera; }
    getDebugCamera() { return this.debugCamera; }
    getUICamera() { return this.uiCamera; }
    getFrontgroundCamera() { return this.frontgroundCamera; }
    getBackgroundCamera() { return this.backgroundCamera; }

}