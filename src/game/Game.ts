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
    async initAndLoadCache() {
        this.add(CacheManager);
        this.get(CacheManager).setDevice(this.getDevice());
        this.get(CacheManager).init();
        await this.get(CacheManager).loadShaderTxtCache("Sprite");

    }
    createOthers() {
        this.ctors.forEach(ctor => {
            this.add(ctor);
            this.get(ctor).setDevice(this.getDevice());
        });
    }
    buildDependency() {
        this.get(InputManager).setSceneManager(this.get(SceneManager));
        this.get(SceneManager).setCameraManager(this.get(CameraManager));
        this.get(RendererManager).setCacheManager(this.get(CacheManager));
        this.get(RendererManager).setSceneManager(this.get(SceneManager));
    }
    initOthers() {
        this.ctors.forEach(ctor => this.get(ctor).init());
    }
    init() {
        this.initAndLoadCache().then(() => {
            this.createOthers();
            this.buildDependency();
            this.initOthers();
            console.log("Game init");
            console.log(this);
            this.update();
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