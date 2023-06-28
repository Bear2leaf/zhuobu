import Device from "../device/Device.js";
import AudioManager from "../manager/AudioManager.js";
import CacheManager from "../manager/CacheManager.js";
import CameraManager from "../manager/CameraManager.js";
import EventManager from "../manager/EventManager.js";
import InputManager from "../manager/InputManager.js";
import SingletonCollection from "../manager/SingletonCollection.js";
import RendererManager from "../manager/RendererManager.js";
import SceneManager from "../manager/SceneManager.js";
import TimestepManager from "../manager/TimestepManager.js";
import Manager from "../manager/Manager.js";


export default abstract class Game extends SingletonCollection<Manager<unknown>> {
    private rafId: number = 0;

    init(device: Device) {

        [
            CacheManager,
            InputManager,
            RendererManager,
            CameraManager,
            TimestepManager,
            SceneManager,
            AudioManager,
            EventManager
        ].forEach(ctor => {
            this.add(ctor);
            this.get(ctor).setDevice(device);
        });
        this.get(CacheManager).init();
        this.get(SceneManager).init();
    }
    tick() {
        this.rafId = requestAnimationFrame(this.tick.bind(this));
    }
    stop() {
        cancelAnimationFrame(this.rafId);
    }
}