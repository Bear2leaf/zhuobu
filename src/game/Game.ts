import Device from "../device/Device.js";
import AudioManager from "../manager/AudioManager.js";
import CacheManager from "../manager/CacheManager.js";
import CameraManager from "../manager/CameraManager.js";
import EventManager from "../manager/EventManager.js";
import FactoryManager from "../manager/FactoryManager.js";
import InputManager from "../manager/InputManager.js";
import Manager from "../manager/Manager.js";
import RendererManager from "../manager/RendererManager.js";
import SceneManager from "../manager/SceneManager.js";
import SystemManager from "../manager/SystemManager.js";
import TimestepManager from "../manager/TimestepManager.js";


export default abstract class Game {
    private readonly managers: Manager[];
    constructor(device: Device) {
        this.managers = [];
        const cacheManager = new CacheManager(device);
        const inputManager = new InputManager(device);
        this.managers.push(cacheManager);
        this.managers.push(new FactoryManager(device.gl, cacheManager, inputManager));
        this.managers.push(new RendererManager());
        this.managers.push(new CameraManager());
        this.managers.push(new TimestepManager(device));
        this.managers.push(new SceneManager());
        this.managers.push(new AudioManager());
        this.managers.push(new EventManager());
        this.managers.push(new SystemManager());
        this.managers.push(inputManager);
    }
}