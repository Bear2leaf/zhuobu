import Device from "../device/Device.js";
import SceneManager from "./SceneManager.js";

export default class WorkerManager {
    private readonly workerPath = 'worker/main.js';
    private device?: Device;
    private sceneManager?: SceneManager;
    private callback?: (data: WorkerRequest) => void;
    private get postMessage() {
        if (this.callback === undefined) {
            throw new Error("callback is undefined");
        }
        return this.callback;
    }
    private setCallback(callback: typeof this.callback) {
        this.callback = callback;
    }
    private messageHandler(data: WorkerResponse): void {
        console.log("messageHandler", data)
        switch (data.type) {
            case "Pong":
                break;
            case "GameInit":
                this.postMessage({ type: "Ping", args: ["Hello"] })
                break;
            case "Refresh":
                this.getDevice().reload();
            case "ToggleUI":
                this.getSceneManager().toggleUIScene();
                break;
        }
    }
    setDevice(device: Device) {
        this.device = device;
    }
    getDevice() {
        if (!this.device) {
            throw new Error("Device not set");
        }
        return this.device;
    }
    initWorker() {
        this.getDevice().createWorker(
            this.workerPath
            , this.messageHandler.bind(this)
            , this.setCallback.bind(this)
        );
        this.postMessage({ type: "Game" });
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
}