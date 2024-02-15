import AddMessage from "../command/AddMessage.js";
import CreateMessageUI from "../command/CreateMessageUI.js";
import EmptyCommand from "../command/EmptyCommand.js";
import GameInit from "../command/GameInit.js";
import ToggleUICommand from "../command/ToggleUICommand.js";
import UpdateEagleVisible from "../command/UpdateEagleVisible.js";
import UpdateResourceProgress from "../command/UpdateResourceProgress.js";
import UpdateStatus from "../command/UpdateStatus.js";
import UpdateWhalesVisible from "../command/UpdateWhalesVisible.js";
import Device from "../device/Device.js";
import EventManager from "./EventManager.js";
import SceneManager from "./SceneManager.js";

export default class WorkerManager {
    private readonly workerPath = '/worker/main.js';
    private readonly workerResponseQueue: WorkerResponse[] = [];
    private device?: Device;
    private eventManager?: EventManager;
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
    private messageHandler(data: WorkerResponse[]): void {
        console.log("[EngineReceive]", data)
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
                    this.getEventManager().workerMessage.setCommand(new EmptyCommand());
                    break;
                case "WorkerInit":
                    this.postMessage({ type: "Ping", args: ["Hello"] })
                    this.getEventManager().workerMessage.setCommand(new EmptyCommand());
                    break;
                case "Refresh":
                    this.getDevice().reload();
                    this.getEventManager().workerMessage.setCommand(new EmptyCommand());
                    break;
                case "Reconnect":
                    this.postMessage({ type: "EngineInit" });
                    this.getEventManager().workerMessage.setCommand(new EmptyCommand());
                    break;
                case "ToggleUI":
                    this.getEventManager().workerMessage.setCommand(new ToggleUICommand());
                    break;
                case "CreateMessageUI":
                    this.getEventManager().workerMessage.setCommand(new CreateMessageUI());
                    break;
                case "GameInit":
                    this.getEventManager().workerMessage.setCommand(new GameInit());
                    break;
                case "AddMessage":
                    this.getEventManager().workerMessage.setCommand(new AddMessage(workerResponse.args[0]));
                    break;
                case "UpdateStatus":
                    this.getEventManager().workerMessage.setCommand(new UpdateStatus(workerResponse.args[0]));
                    break;
                case "UpdateEagleVisible":
                    this.getEventManager().workerMessage.setCommand(new UpdateEagleVisible(workerResponse.args[0]));
                    break;
                case "UpdateWhalesVisible":
                    this.getEventManager().workerMessage.setCommand(new UpdateWhalesVisible(workerResponse.args[0]));
                    break;
                case "UpdateResourceProgress":
                    this.getEventManager().workerMessage.setCommand(new UpdateResourceProgress(workerResponse.args[0]));
                    break;
                default:
                    console.warn(`Unknown workerResponse ${JSON.stringify(workerResponse)}`);
            }
            const command = this.getEventManager().workerMessage.getCommand();

            command.addMessage = this.getSceneManager().addMessage.bind(this.getSceneManager());
            command.updateStatus = this.getSceneManager().updateStatus.bind(this.getSceneManager());
            command.toggleUIScene = this.getSceneManager().toggleUIScene.bind(this.getSceneManager());
            command.createMessageUI = this.getSceneManager().createMessageUI.bind(this.getSceneManager());
            command.getEnvironmentScene = this.getSceneManager().getEnvironmentScene.bind(this.getSceneManager());
            command.getInformationObject = this.getSceneManager().getInformationObject.bind(this.getSceneManager());
            command.loadInitScene = this.getSceneManager().loadInitScene.bind(this.getSceneManager());
            this.getEventManager().workerMessage.notify();
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
        this.postMessage({ type: "EngineInit" });
        this.getEventManager().onCameraChange.postMessage = this.postMessage.bind(this);
    }
    initObservers() {
        this.getEventManager().onClickPick.onExplorePicked = () => this.onExplorePicked();
        this.getEventManager().onClickPick.onRestPicked = () => this.onRestPicked();
    }
    onExplorePicked() {
        this.postMessage({ type: "Explore" });
    }
    onRestPicked() {
        this.postMessage({ type: "Rest" });
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