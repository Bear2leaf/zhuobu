import AudioManager from "../manager/AudioManager.js";
import CacheManager from "../manager/CacheManager.js";
import CameraManager from "../manager/CameraManager.js";
import InputManager from "../manager/InputManager.js";
import RendererManager from "../manager/RendererManager.js";
import SceneManager from "../manager/SceneManager.js";
import TimestepManager from "../manager/TimestepManager.js";
import Manager from "../manager/Manager.js";
import TextureManager from "../manager/TextureManager.js";
import GLTFManager from "../manager/GLTFManager.js";


export default abstract class Game extends Manager<unknown> {
    private rafId: number = 0;
    private readonly ctors =
        [
            CacheManager,
            RendererManager,
            GLTFManager,
            CameraManager,
            InputManager,
            TextureManager,
            SceneManager,
            TimestepManager,
            AudioManager
        ];
    addObjects() {
        this.ctors.forEach(ctor => {
            this.add(ctor);
            this.get(ctor).setDevice(this.getDevice());
            this.get(ctor).addObjects();
        });
    }
    async load(): Promise<void> {
        await this.getDevice().loadSubpackage();
        for await (const iterator of this.ctors) {
            await this.get(iterator).load();
        }
        await this.getDevice().loadSubpackage();
    }
    init(): void {

        this.buildDependency();
        this.ctors.forEach(ctor => this.get(ctor).init());
        console.log("Game init");
        console.log(this);
    }
    buildDependency() {
        this.get(InputManager).setSceneManager(this.get(SceneManager));
        this.get(CameraManager).setSceneManager(this.get(SceneManager));
        this.get(TextureManager).setSceneManager(this.get(SceneManager));
        this.get(TextureManager).setCacheManager(this.get(CacheManager));
        this.get(RendererManager).setCacheManager(this.get(CacheManager));
        this.get(RendererManager).setSceneManager(this.get(SceneManager));
        this.get(GLTFManager).setSceneManager(this.get(SceneManager));
        this.get(GLTFManager).setCacheManager(this.get(CacheManager));
        this.get(TimestepManager).setSceneManager(this.get(SceneManager));
    }
    update() {
        this.ctors.forEach(ctor => this.get(ctor).update());
        this.rafId = requestAnimationFrame(this.update.bind(this));
    }
    stop() {
        cancelAnimationFrame(this.rafId);
    }
}