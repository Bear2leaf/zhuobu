import Device from "../device/Device.js";

export default class WorkerManager {
    private device?: Device;
    private callback?: (data: WorkerRequest) => void;
    get postMessage() {
        if (this.callback === undefined) {
            throw new Error("callback is undefined");
        }
        return this.callback;
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
    setCallback(callback: typeof this.callback) {
        this.callback = callback;
    }
    messageHandler(data: WorkerResponse): void {
        console.log("messageHandler", data)
        switch (data.type) {
            case "Pong":
                break;
            case "WorkerInit":
                this.postMessage({ type: "Ping", args: ["Hello"] })
                break;
            case "Refresh":
                this.getDevice().reload();
                break;
        }
    }
    initWorker() {
        this.getDevice().createWorker(
            'worker/main.js'
            , this.messageHandler.bind(this)
            , this.setCallback.bind(this)
        );
        this.postMessage({
            type: "Join"
        })
    }
}