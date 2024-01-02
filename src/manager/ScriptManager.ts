import SceneManager from "./SceneManager.js";
import EventManager from "./EventManager.js";
import Device from "../device/Device.js";

export default class ScriptManager {
    private sceneManager?: SceneManager;
    private eventManager?: EventManager;
    private device?: Device;
    setDevice(device: Device) {
        this.device = device;
    }
    getDevice() {
        if (!this.device) {
            throw new Error("Device not found.")
        }
        return this.device;
    }

    initObservers() {
        this.getEventManager().onEntityUpdate.setAdrManager(this);
        this.getEventManager().onClickPick.setAdrManager(this);
        this.getEventManager().onRemove.setAdrManager(this);
        this.getEventManager().onIdChange.setAdrManager(this);
        this.getEventManager().onParentChange.setAdrManager(this);
    }
    getEventManager(): EventManager {
        if (this.eventManager === undefined) {
            throw new Error("eventManager is undefined");
        }
        return this.eventManager;
    }
    setEventManager(eventManager: EventManager) {
        this.eventManager = eventManager;
    }
    getSceneManager() {
        if (this.sceneManager === undefined) {
            throw new Error("sceneManager is undefined");
        }
        return this.sceneManager;
    }
    setSceneManager(sceneManager: SceneManager) {
        this.sceneManager = sceneManager;
    }

}