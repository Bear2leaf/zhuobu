import Device from "../device/Device.js";
import AudioManager from "../manager/AudioManager.js";
import CacheManager from "../manager/CacheManager.js";
import CameraManager from "../manager/CameraManager.js";
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
        const cacheManager = new CacheManager(device);
        cacheManager.loadFontCache("boxy_bold_font").then(() => {
            const inputManager = new InputManager(device);
            this.managers.push(cacheManager);
            this.managers.push(new FactoryManager(device.gl, cacheManager, inputManager));
            this.managers.push(new RendererManager());
            this.managers.push(new CameraManager());
            this.managers.push(new TimestepManager(device));
            this.managers.push(new SceneManager());
            this.managers.push(new AudioManager());
            this.managers.push(inputManager);
        });
    }
}