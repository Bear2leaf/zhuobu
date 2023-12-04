import Device from "../device/Device.js";
import SceneManager from "./SceneManager.js";

export default class TimestepManager {
    private sceneManager?: SceneManager;
    private frames: number = 0;
    private currentFrameTime: number = 0;
    private lastFrameTime: number = 0;
    private deltaTime: number = 0;
    private fps: number = 0;
    private device?: Device;
    setDevice(device: Device) {
        this.device = device;
    }
    getDevice(): Device {
        if (this.device === undefined) {
            throw new Error("device is undefined");
        }
        return this.device;
    }
    now(): number {
        return this.getDevice().now();
    }
    getFrames(): number {
        return this.frames;
    }
    getDeltaTime(): number {
        return this.deltaTime;
    }
    getFPS(): number {
        return this.fps;
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
    tick(): void {
        this.frames++;
        this.currentFrameTime = this.now();
        this.deltaTime = this.currentFrameTime - this.lastFrameTime;
        this.fps = 1000 / this.deltaTime;
        this.lastFrameTime = this.currentFrameTime;
    }

}