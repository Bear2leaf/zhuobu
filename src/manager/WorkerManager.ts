import Device from "../device/Device.js";
import EventManager from "./EventManager.js";

export default class WorkerManager {
    private readonly workerPath = 'worker/main.js';
    private readonly workerResponseQueue: WorkerResponse[] = [];
    private device?: Device;
    private eventManager?: EventManager;
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
    private messageHandler(data: WorkerResponse[]): void {
        console.log("messageHandler", data)
        this.workerResponseQueue.push(...data);
    }
    processMessage() {
        while (this.workerResponseQueue.length > 0) {
            const workerResponse = this.workerResponseQueue.shift();
            if (workerResponse === undefined) {
                throw new Error("workerResponse is undefined");
            }

            switch (workerResponse.type) {
                case "Pong":
                    break;
                case "WorkerInit":
                    this.postMessage({ type: "Ping", args: ["Hello"] })
                    break;
                case "Refresh":
                    this.getDevice().reload();
                    break;
                case "ToggleUI":
                    this.getEventManager().workerMessage.notifyToggleUI();
                    break;
                case "CreateMessageUI":
                    this.getEventManager().workerMessage.notifyCreateMessageUI();
                    break;
                default:
                    throw new Error(`Unknown workerResponse ${JSON.stringify(workerResponse)}`);
            }
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
        this.postMessage({ type: "GameInit" });
    }
    getEventManager(): EventManager {
        if (this.eventManager === undefined) {
            throw new Error("eventManager is undefined");
        }
        return this.eventManager;
    }
    setEventManager(sceneManager: EventManager) {
        this.eventManager = sceneManager;
    }
}