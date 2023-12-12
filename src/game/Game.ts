import AudioManager from "../manager/AudioManager.js";
import CacheManager from "../manager/CacheManager.js";
import CameraManager from "../manager/CameraManager.js";
import InputManager from "../manager/InputManager.js";
import RendererManager from "../manager/RendererManager.js";
import SceneManager from "../manager/SceneManager.js";
import TimestepManager from "../manager/TimestepManager.js";
import TextureManager from "../manager/TextureManager.js";
import GLTFManager from "../manager/GLTFManager.js";
import EventManager from "../manager/EventManager.js";
import FrameBufferManager from "../manager/FrameBufferManager.js";
import WorkerManager from "../manager/WorkerManager.js";
import AnimationManager from "../manager/AnimationManager.js";
import OffscreenCanvasManager from "../manager/OffscreenCanvasManager.js";
import AdrManager from "../manager/AdrManager.js";
import Device from "../device/Device.js";


export default abstract class Game {
    private rafId: number = 0;
    private readonly cacheManager = new CacheManager;
    private readonly gltfManager = new GLTFManager;
    private readonly inputManager = new InputManager;
    private readonly eventManager = new EventManager;
    private readonly textureManager = new TextureManager;
    private readonly offscreencanvasManager = new OffscreenCanvasManager;
    private readonly cameraManager = new CameraManager;
    private readonly rendererManager = new RendererManager;
    private readonly sceneManager = new SceneManager;
    private readonly timestepManager = new TimestepManager;
    private readonly animationManager = new AnimationManager;
    private readonly audioManager = new AudioManager;
    private readonly framebufferManager = new FrameBufferManager;
    private readonly workerManager = new WorkerManager;
    private readonly adrManager = new AdrManager;
    initManagers(device: Device): void {
        this.textureManager.initTextures();
        this.offscreencanvasManager.initOffscreenCanvas();
        this.inputManager.initInput(device);
        this.cameraManager.initCamera(device);
        this.rendererManager.initRenderer();
        this.framebufferManager.initFramebuffer();
        this.adrManager.initAdr();
        this.audioManager.initAudio();
        this.sceneManager.initSceneEntities();
        device.createWorker('worker/main.js', this.workerManager.workerHandler.bind(this.workerManager));
    }
    async load(device: Device): Promise<void> {
        await device.loadSubpackage();
        await this.gltfManager.load();
        await this.textureManager.load();
        await this.rendererManager.load();
        await this.audioManager.load();
    }
    buildVars(device: Device) {
        this.adrManager.setDevice(device);
        this.cacheManager.setDevice(device);
        this.timestepManager.setDevice(device);
        this.framebufferManager.setDevice(device);
        this.rendererManager.setDevice(device);
        this.textureManager.setDevice(device);
        this.offscreencanvasManager.setDevice(device);
        this.audioManager.setAudioContext(device.createWebAudioContext());
        this.inputManager.initObservers();
        this.eventManager.initObservers();
        this.rendererManager.initObservers();
        this.framebufferManager.initObservers();
        this.textureManager.initObservers();
        this.animationManager.initObservers();
        this.adrManager.initObservers();
        this.offscreencanvasManager.initObservers();
        this.gltfManager.initObservers();
        this.gltfManager.setGLTFNames();
        this.gltfManager.setBufferCaches();
        this.rendererManager.initShaderName();
        this.sceneManager.initSubjects(this.eventManager);
        this.sceneManager.registerEntities();
    }
    buildDependency() {
        this.rendererManager.setEventManager(this.eventManager);
        this.textureManager.setEventManager(this.eventManager);
        this.offscreencanvasManager.setEventManager(this.eventManager);
        this.adrManager.setEventManager(this.eventManager);
        this.inputManager.setEventManager(this.eventManager);
        this.animationManager.setEventManager(this.eventManager);
        this.gltfManager.setEventManager(this.eventManager);
        this.textureManager.setCacheManager(this.cacheManager);
        this.offscreencanvasManager.setTextureManager(this.textureManager);
        this.framebufferManager.setTextureManager(this.textureManager);
        this.framebufferManager.setRendererManager(this.rendererManager);
        this.framebufferManager.setEventManager(this.eventManager);
        this.rendererManager.setCacheManager(this.cacheManager);
        this.rendererManager.setSceneManager(this.sceneManager);
        this.rendererManager.setCameraManager(this.cameraManager);
        this.audioManager.setCacheManager(this.cacheManager);
        this.adrManager.setSceneManager(this.sceneManager);
        this.gltfManager.setSceneManager(this.sceneManager);
        this.gltfManager.setCacheManager(this.cacheManager);
        this.timestepManager.setSceneManager(this.sceneManager);
    }
    update() {
        this.timestepManager.tick();
        this.inputManager.process();
        this.sceneManager.update();
        this.sceneManager.render();
        this.framebufferManager.processPickFramebuffer();
        this.rafId = requestAnimationFrame(this.update.bind(this));
    }
    stop() {
        cancelAnimationFrame(this.rafId);
    }
}