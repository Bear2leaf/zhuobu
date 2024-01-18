import Device from "../device/Device.js";
import BackSpriteRenderer from "../renderer/BackSpriteRenderer.js";
import GLTFMeshRenderer from "../renderer/GLTFMeshRenderer.js";
import GLTFSkinMeshRenderer from "../renderer/GLTFSkinMeshRenderer.js";
import { LineRenderer } from "../renderer/LineRenderer.js";
import { PointRenderer } from "../renderer/PointRenderer.js";
import SDFRenderer from "../renderer/SDFRenderer.js";
import { SkyboxRenderer } from "../renderer/SkyboxRenderer.js";
import SpriteRenderer from "../renderer/SpriteRenderer.js";
import TerrianRenderer from "../renderer/TerrianRenderer.js";
import WaterRenderer from "../renderer/WaterRenderer.js";
import WireframeRenderer from "../renderer/WireframeRenderer.js";
import CacheManager from "./CacheManager.js";
import CameraManager from "./CameraManager.js";
import EventManager from "./EventManager.js";
import SceneManager from "./SceneManager.js";

export default class RendererManager {
    private readonly spriteRenderer = new SpriteRenderer;
    private readonly backSpriteRenderer = new BackSpriteRenderer;
    private readonly waterRenderer = new WaterRenderer;
    private readonly skyboxRenderer = new SkyboxRenderer;
    private readonly sdfRenderer = new SDFRenderer;
    private readonly lineRenderer = new LineRenderer;
    private readonly gltfMeshRenderer = new GLTFMeshRenderer;
    private readonly terrianRenderer = new TerrianRenderer;
    private readonly wireframeRenderer = new WireframeRenderer;
    private readonly gltfSkinMeshRenderer = new GLTFSkinMeshRenderer;
    private readonly pointRenderer = new PointRenderer;
    private cacheManager?: CacheManager;
    private sceneManager?: SceneManager;
    private cameraManager?: CameraManager;
    private eventManager?: EventManager;
    private device?: Device;
    initShaderName() {
        this.spriteRenderer.setShaderName("Sprite");
        this.backSpriteRenderer.setShaderName("Sprite");
        this.skyboxRenderer.setShaderName("Skybox");
        this.sdfRenderer.setShaderName("SDF");
        this.lineRenderer.setShaderName("Line");
        this.gltfMeshRenderer.setShaderName("Mesh");
        this.terrianRenderer.setShaderName("Terrian");
        this.wireframeRenderer.setShaderName("Wireframe");
        this.gltfSkinMeshRenderer.setShaderName("SkinMesh");
        this.pointRenderer.setShaderName("Point");
        this.waterRenderer.setShaderName("Water");
    }
    async load(): Promise<void> {


        await this.spriteRenderer.loadShaderTxtCache(this.getCacheManager());
        await this.backSpriteRenderer.loadShaderTxtCache(this.getCacheManager());
        await this.skyboxRenderer.loadShaderTxtCache(this.getCacheManager());
        await this.sdfRenderer.loadShaderTxtCache(this.getCacheManager());
        await this.lineRenderer.loadShaderTxtCache(this.getCacheManager());
        await this.gltfMeshRenderer.loadShaderTxtCache(this.getCacheManager());
        await this.terrianRenderer.loadShaderTxtCache(this.getCacheManager());
        await this.wireframeRenderer.loadShaderTxtCache(this.getCacheManager());
        await this.gltfSkinMeshRenderer.loadShaderTxtCache(this.getCacheManager());
        await this.pointRenderer.loadShaderTxtCache(this.getCacheManager());
        await this.waterRenderer.loadShaderTxtCache(this.getCacheManager());

    }
    setDevice(device: Device) {
        this.device = device;
    }
    getDevice(): Device {
        if (this.device === undefined) {
            throw new Error("device is undefined");
        }
        return this.device;
    }
    initObservers() {
        this.getEventManager().onEntityInit.setRenderingContext(this.getDevice().getRenderingContext())
        this.getEventManager().onEntityInit.setWindowInfo(this.getDevice().getMiniGameWindowInfo())
        this.getEventManager().onEntityRender.setRendererManager(this);
        this.getEventManager().onViewPortChange.setDevice(this.getDevice());

    }
    initRenderer(): void {
        const rc = this.getDevice().getRenderingContext();
        rc.init();
        [
            this.gltfSkinMeshRenderer,
            this.gltfMeshRenderer,
            this.terrianRenderer,
            this.wireframeRenderer,
            this.skyboxRenderer,
            this.waterRenderer,
        ].forEach(renderer => {
            renderer.setCamera(this.getCameraManager().getMainCamera());
            renderer.initShader(rc, this.getCacheManager());
            renderer.setSceneManager(this.getSceneManager());
        });
        [
            this.sdfRenderer,
            this.lineRenderer,
        ].forEach(renderer => {
            renderer.setCamera(this.getCameraManager().getFrontgroundCamera());
            renderer.initShader(rc, this.getCacheManager());
            renderer.setSceneManager(this.getSceneManager());
        });
        this.pointRenderer.setCamera(this.getCameraManager().getUICamera());
        this.pointRenderer.initShader(rc, this.getCacheManager());
        this.pointRenderer.setSceneManager(this.getSceneManager());
        this.backSpriteRenderer.setCamera(this.getCameraManager().getBackgroundCamera());
        this.backSpriteRenderer.initShader(rc, this.getCacheManager());
        this.backSpriteRenderer.setSceneManager(this.getSceneManager());
        this.spriteRenderer.setCamera(this.getCameraManager().getFrontgroundCamera());
        this.spriteRenderer.initShader(rc, this.getCacheManager());
        this.spriteRenderer.setSceneManager(this.getSceneManager());
    }
    render(): void {
        this.getEventManager().onViewPortChange.notify();
        [
            this.skyboxRenderer,
            this.backSpriteRenderer,
            this.spriteRenderer,
            this.lineRenderer,
            this.terrianRenderer,
            this.gltfMeshRenderer,
            this.wireframeRenderer,
            this.gltfSkinMeshRenderer,
            this.waterRenderer,
            this.sdfRenderer,
            this.pointRenderer
        ].forEach(renderer => {
            renderer.render();
        })
    }
    getSDFRenderer() {
        return this.sdfRenderer;
    }
    getLineRenderer() {
        return this.lineRenderer;
    }
    getSpriteRenderer() {
        return this.spriteRenderer;
    }
    getBackSpriteRenderer() {
        return this.backSpriteRenderer;
    }
    getPointRenderer() {
        return this.pointRenderer;
    }
    getMeshRenderer() {
        return this.gltfMeshRenderer;
    }
    getTerrianRenderer() {
        return this.terrianRenderer;
    }
    getWireframeRenderer() {
        return this.wireframeRenderer;
    }
    getSkyboxRenderer() {
        return this.skyboxRenderer;
    }
    getWaterRenderer() {
        return this.waterRenderer;
    }
    getSkinMeshRenderer() {
        return this.gltfSkinMeshRenderer;
    }
    setCacheManager(cacheManager: CacheManager) {
        this.cacheManager = cacheManager;
    }
    getCacheManager(): CacheManager {
        if (this.cacheManager === undefined) {
            throw new Error("cacheManager is undefined");
        }
        return this.cacheManager;
    }
    getSceneManager(): SceneManager {
        if (this.sceneManager === undefined) {
            throw new Error("sceneManager is undefined");
        }
        return this.sceneManager;
    }
    setSceneManager(sceneManager: SceneManager) {
        this.sceneManager = sceneManager;
    }
    getCameraManager(): CameraManager {
        if (this.cameraManager === undefined) {
            throw new Error("cameraManager is undefined");
        }
        return this.cameraManager;
    }
    setCameraManager(cameraManager: CameraManager) {
        this.cameraManager = cameraManager;
    }
    getEventManager(): EventManager {
        if (this.eventManager === undefined) {
            throw new Error("eventManager is undefined");
        }
        return this.eventManager;
    }
    setEventManager(eventManager: EventManager) {
        this.eventManager = eventManager;
    }
}