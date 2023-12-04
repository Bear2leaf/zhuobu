import Camera from "../camera/Camera.js";
import { MainCamera } from "../camera/MainCamera.js";
import { FrontgroundCamera } from "../camera/FrontgroundCamera.js";
import { DebugCamera } from "../camera/DebugCamera.js";
import { BackgroundCamera } from "../camera/BackgroundCamera.js";
import { UICamera } from "../camera/UICamera.js";
import Device from "../device/Device.js";

export default class CameraManager {
    private readonly debugCamera = new DebugCamera;
    private readonly mainCamera = new MainCamera;
    private readonly uiCamera = new UICamera;
    private readonly frontgroundCamera = new FrontgroundCamera;
    private readonly backgroundCamera = new BackgroundCamera;
    async load(): Promise<void> { }
    initCamera(device: Device): void {
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
    getMainCamera() { return this.mainCamera; }
    getDebugCamera() { return this.debugCamera; }
    getUICamera() { return this.uiCamera; }
    getFrontgroundCamera() { return this.frontgroundCamera; }
    getBackgroundCamera() { return this.backgroundCamera; }

}