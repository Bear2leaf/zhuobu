import Device from "../device/Device.js";
import AudioManager from "../manager/AudioManager.js";
import CacheManager from "../manager/CacheManager.js";
import CameraManager from "../manager/CameraManager.js";
import DeviceManager from "../manager/DeviceManager.js";
import FactoryManager from "../manager/FactoryManager.js";
import InputManager from "../manager/InputManager.js";
import Manager from "../manager/Manager.js";
import RendererManager from "../manager/RendererManager.js";
import SceneManager from "../manager/SceneManager.js";
import TimestepManager from "../manager/TimestepManager.js";
import Game from "./Game.js";

export default abstract class AGame implements Game {
    private readonly managers: Manager[];
    constructor(device: Device) {
        this.managers = [];
        this.managers.push(new DeviceManager(device));
        this.managers.push(new CacheManager(this));
        this.managers.push(new FactoryManager(this));
        this.managers.push(new RendererManager(this));
        this.managers.push(new CameraManager(this));
        this.managers.push(new TimestepManager(this));
        this.managers.push(new SceneManager(this));

    }
    getCacheManager(): CacheManager {
        for (const manager of this.managers) {
            if (manager instanceof CacheManager) {
                return manager;
            }
        }
        throw new Error("CacheManager not found");
    }
    getFactoryManager(): FactoryManager {
        for (const manager of this.managers) {
            if (manager instanceof FactoryManager) {
                return manager;
            }
        }
        throw new Error("FactoryManager not found");
    }
    getRendererManager(): RendererManager {

        for (const manager of this.managers) {
            if (manager instanceof RendererManager) {
                return manager;
            }
        }
        throw new Error("RendererManager not found");
    }
    getCameraManager(): CameraManager {
        for (const manager of this.managers) {
            if (manager instanceof CameraManager) {
                return manager;
            }
        }
        throw new Error("CameraManager not found");
    }
    getTimestepManager(): TimestepManager {
        for (const manager of this.managers) {
            if (manager instanceof TimestepManager) {
                return manager;
            }
        }
        throw new Error("TimestepManager not found");
    }
    getDeviceManager(): DeviceManager {
        for (const manager of this.managers) {
            if (manager instanceof DeviceManager) {
                return manager;
            }
        }
        throw new Error("DeviceManager not found");
    }
    getSceneManager(): SceneManager {
        for (const manager of this.managers) {
            if (manager instanceof SceneManager) {
                return manager;
            }
        }
        throw new Error("SceneManager not found");
    }
    getInputManager(): InputManager {
        for (const manager of this.managers) {
            if (manager instanceof InputManager) {
                return manager;
            }
        }
        throw new Error("InputManager not found");
    }
    getAudioManager(): AudioManager {
        for (const manager of this.managers) {
            if (manager instanceof AudioManager) {
                return manager;
            }
        }
        throw new Error("AudioManager not found");
    }
}