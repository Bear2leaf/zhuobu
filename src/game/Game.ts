import Device from "../device/Device.js";
import AudioManager from "../manager/AudioManager.js";
import CacheManager from "../manager/CacheManager.js";
import CameraManager from "../manager/CameraManager.js";
import InputManager from "../manager/InputManager.js";
import RendererManager from "../manager/RendererManager.js";
import SceneManager from "../manager/SceneManager.js";
import TimestepManager from "../manager/TimestepManager.js";
import Manager from "../manager/Manager.js";


export default abstract class Game extends Manager<unknown> {
    private rafId: number = 0;
    private readonly ctors =
        [
            CameraManager,
            InputManager,
            SceneManager,
            RendererManager,
            TimestepManager,
            AudioManager
        ];
    
    init() {
        this.add(CacheManager);
        this.get(CacheManager).setDevice(this.getDevice());
        this.get(CacheManager).init();
        this.get(CacheManager).loadShaderTxtCache("Sprite").then(() => {

            this.ctors.forEach(ctor => {
                this.add(ctor);
                this.get(ctor).setDevice(this.getDevice());
            });
            this.get(InputManager).setSceneManager(this.get(SceneManager));
            this.get(SceneManager).setCameraManager(this.get(CameraManager));
            this.get(RendererManager).setCacheManager(this.get(CacheManager));

            this.get(RendererManager).setSceneManager(this.get(SceneManager));
            this.ctors.forEach(ctor => this.get(ctor).init());
            this.update();
            console.log("Game init");
            console.log(this);
        });
    }
    update() {
        this.ctors.forEach(ctor => this.get(ctor).update());
        this.rafId = requestAnimationFrame(this.update.bind(this));
    }
    stop() {
        cancelAnimationFrame(this.rafId);
    }
}