import Device from "../device/Device.js";
import WithAddGet from "../interface/WithAddGet.js";
import AudioManager from "../manager/AudioManager.js";
import CacheManager from "../manager/CacheManager.js";
import CameraManager from "../manager/CameraManager.js";
import EventManager from "../manager/EventManager.js";
import FactoryManager from "../manager/FactoryManager.js";
import InputManager from "../manager/InputManager.js";
import Manager from "../manager/Manager.js";
import RendererManager from "../manager/RendererManager.js";
import SceneManager from "../manager/SceneManager.js";
import TimestepManager from "../manager/TimestepManager.js";


export default abstract class Game implements WithAddGet<Manager, Game> {
    private rafId: number = 0;
    private readonly managers: Manager[] = [];
    constructor(private readonly device: Device) {
        [
            CacheManager,
            InputManager,
            FactoryManager,
            RendererManager,
            CameraManager,
            TimestepManager,
            SceneManager,
            AudioManager,
            EventManager
        ].forEach(ctor => this.add<Manager>(ctor));

    }
    tick() {
        this.managers.forEach(manager => manager.tick());
        this.rafId = requestAnimationFrame(this.tick.bind(this));
    }
    stop() {
        cancelAnimationFrame(this.rafId);
        this.get(TimestepManager).reset();
    }

    getDevice() {
        return this.device;
    }
    add<T extends Manager>(ctor: new (from: Game) => T): void {
        const managers = this.managers.filter(m => m instanceof ctor);
        if (managers.length !== 0) {
            throw new Error(`addManager error, manager ${ctor.name} already exist`);
        } else {
            this.managers.push(new ctor(this));
        }
    }
    get<T extends Manager>(managerClass: new (from: Game) => T): T {
        const managers = this.managers.filter(manager => manager instanceof managerClass);
        if (managers.length === 0) {
            throw new Error(`manager ${managerClass.name} not exist`);
        } else if (managers.length > 1) {
            throw new Error(`manager ${managerClass.name} is duplicated`);
        } else {
            return managers[0] as T;
        }

    }
}