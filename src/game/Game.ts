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
import EventManager from "../manager/EventManager.js";
import FrameBufferManager from "../manager/FrameBufferManager.js";
import WorkerManager from "../manager/WorkerManager.js";
import AnimationManager from "../manager/AnimationManager.js";
import ModifierManager from "../manager/ModifierManager.js";


export default abstract class Game extends Manager<Object> {
    private rafId: number = 0;
    addObjects() {
        
        const ctors: (new () => Manager<Object>)[] = [
            CacheManager,
            GLTFManager,
            CameraManager,
            InputManager,
            EventManager,
            TextureManager,
            SceneManager,
            TimestepManager,
            AnimationManager,
            AudioManager,
            FrameBufferManager,
            RendererManager,
            WorkerManager,
            ModifierManager
        ];
        ctors.forEach(ctor => {
            this.add(ctor);
            this.get(ctor).setDevice(this.getDevice());
            this.get(ctor).addObjects();
        });
        this.buildDependency();
    }
    async load(): Promise<void> {
        await this.getDevice().loadSubpackage();
        for await (const iterator of this.ctors<Manager<Object>>()) {
            await this.get<Manager<Object>>(iterator).load();
        }
    }
    init(): void {

        this.ctors<Manager<Object>>().forEach(ctor => this.get<Manager<Object>>(ctor).init());
        this.get(RendererManager).bindEntityRenderer();
    }
    buildDependency() {
        this.get(CacheManager).setSceneManager(this.get(SceneManager));
        this.get(InputManager).setSceneManager(this.get(SceneManager));
        this.get(EventManager).setSceneManager(this.get(SceneManager));
        this.get(CameraManager).setSceneManager(this.get(SceneManager));
        this.get(CameraManager).setTimestepManager(this.get(TimestepManager));
        this.get(TextureManager).setSceneManager(this.get(SceneManager));
        this.get(TextureManager).setCacheManager(this.get(CacheManager));
        this.get(FrameBufferManager).setTextureManager(this.get(TextureManager));
        this.get(FrameBufferManager).setSceneManager(this.get(SceneManager));
        this.get(RendererManager).setCacheManager(this.get(CacheManager));
        this.get(RendererManager).setSceneManager(this.get(SceneManager));
        this.get(AudioManager).setSceneManager(this.get(SceneManager));
        this.get(AudioManager).setCacheManager(this.get(CacheManager));
        this.get(GLTFManager).setSceneManager(this.get(SceneManager));
        this.get(GLTFManager).setCacheManager(this.get(CacheManager));
        this.get(TimestepManager).setSceneManager(this.get(SceneManager));
        this.get(AnimationManager).setSceneManager(this.get(SceneManager));
        this.get(AnimationManager).setTimestepManager(this.get(TimestepManager));
        this.get(ModifierManager).setSceneManager(this.get(SceneManager));
        this.get(ModifierManager).setTimestepManager(this.get(TimestepManager));
    }
    update() {
        this.ctors<Manager<Object>>().forEach(ctor => this.get<Manager<Object>>(ctor).update());
        this.rafId = requestAnimationFrame(this.update.bind(this));
    }
    stop() {
        cancelAnimationFrame(this.rafId);
    }
}