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
import Device from "../device/Device.js";


export default abstract class Engine {
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
    initManagers(): void {
        this.textureManager.initTextures();
        this.offscreencanvasManager.initOffscreenCanvas();
        this.inputManager.initInput();
        this.cameraManager.initCamera();
        this.rendererManager.initRenderer();
        this.framebufferManager.initFramebuffer();
        this.audioManager.initAudio();
        this.sceneManager.initSceneEntities();
        this.workerManager.initWorker();
    }
    async load(device: Device): Promise<void> {
        await device.loadSubpackage();
        await this.gltfManager.load();
        await this.textureManager.load();
        await this.rendererManager.load();
        await this.audioManager.load();
    }
    buildVars(device: Device) {
        this.workerManager.setDevice(device);
        this.cacheManager.setDevice(device);
        this.timestepManager.setDevice(device);
        this.framebufferManager.setDevice(device);
        this.rendererManager.setDevice(device);
        this.cameraManager.setDevice(device);
        this.textureManager.setDevice(device);
        this.inputManager.setDevice(device);
        this.offscreencanvasManager.setDevice(device);
        this.audioManager.setDevice(device);
        this.cameraManager.initObservers();
        this.inputManager.initObservers();
        this.eventManager.initObservers();
        this.rendererManager.initObservers();
        this.framebufferManager.initObservers();
        this.textureManager.initObservers();
        this.animationManager.initObservers();
        this.offscreencanvasManager.initObservers();
        this.gltfManager.initObservers();
        this.gltfManager.setGLTFNames();
        this.gltfManager.setBufferCaches();
        this.rendererManager.initShaderName();
        this.sceneManager.initObservers();
        this.sceneManager.initSubjects();
        this.sceneManager.registerEntities();
        this.audioManager.initAudioContext();
    }
    buildDependency() {
        this.rendererManager.setEventManager(this.eventManager);
        this.textureManager.setEventManager(this.eventManager);
        this.offscreencanvasManager.setEventManager(this.eventManager);
        this.cameraManager.setEventManager(this.eventManager);
        this.inputManager.setEventManager(this.eventManager);
        this.animationManager.setEventManager(this.eventManager);
        this.gltfManager.setEventManager(this.eventManager);
        this.textureManager.setCacheManager(this.cacheManager);
        this.offscreencanvasManager.setTextureManager(this.textureManager);
        this.framebufferManager.setTextureManager(this.textureManager);
        this.framebufferManager.setRendererManager(this.rendererManager);
        this.framebufferManager.setEventManager(this.eventManager);
        this.sceneManager.setEventManager(this.eventManager);
        this.rendererManager.setCacheManager(this.cacheManager);
        this.rendererManager.setSceneManager(this.sceneManager);
        this.workerManager.setEventManager(this.eventManager);
        this.rendererManager.setCameraManager(this.cameraManager);
        this.audioManager.setCacheManager(this.cacheManager);
        this.gltfManager.setSceneManager(this.sceneManager);
        this.gltfManager.setCacheManager(this.cacheManager);
        this.timestepManager.setSceneManager(this.sceneManager);
    }
    update() {
        this.timestepManager.tick();
        this.workerManager.processMessage();
        this.inputManager.process();
        this.sceneManager.update();
        this.sceneManager.collectRefractFramebufferObject();
        this.framebufferManager.processRefractFramebuffer();
        this.sceneManager.collectReflectFramebufferObject();
        this.framebufferManager.processReflectFramebuffer();
        this.sceneManager.collectPickFramebufferObject();
        this.framebufferManager.processPickFramebuffer();
        this.sceneManager.collectDepthFramebufferObject();
        this.framebufferManager.processDepthFramebuffer();
        this.sceneManager.collectDrawObject();
        this.rendererManager.render();
        this.audioManager.process();
        this.rafId = requestAnimationFrame(this.update.bind(this));
    }
    stop() {
        cancelAnimationFrame(this.rafId);
    }
}