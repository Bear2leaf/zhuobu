import GLTFAnimationController from "../controller/GLTFAnimationController.js";
import Device from "../device/Device.js";
import Border from "../drawobject/Border.js";
import HelloWireframe from "../drawobject/HelloWireframe.js";
import Mesh from "../drawobject/Mesh.js";
import Pointer from "../drawobject/Pointer.js";
import SDFCharacter from "../drawobject/SDFCharacter.js";
import Sky from "../drawobject/Sky.js";
import Skybox from "../drawobject/Skybox.js";
import Terrain from "../drawobject/Terrain.js";
import TerrainCDLOD from "../drawobject/TerrainCDLOD.js";
import TerrainDepth from "../drawobject/TerrainDepth.js";
import TerrainMesh from "../drawobject/TerrainMesh.js";
import Entity from "../entity/Entity.js";
import Hamburger from "../layout/Hamburger.js";
import BackSpriteRenderer from "../renderer/BackSpriteRenderer.js";
import GLTFMeshRenderer from "../renderer/GLTFMeshRenderer.js";
import GLTFSkinMeshRenderer from "../renderer/GLTFSkinMeshRenderer.js";
import { LineRenderer } from "../renderer/LineRenderer.js";
import { PointRenderer } from "../renderer/PointRenderer.js";
import SDFRenderer from "../renderer/SDFRenderer.js";
import { SkyRenderer } from "../renderer/SkyRenderer.js";
import { SkyboxRenderer } from "../renderer/SkyboxRenderer.js";
import SpriteRenderer from "../renderer/SpriteRenderer.js";
import TerrainCDLODRenderer from "../renderer/TerrainCDLODRenderer.js";
import TerrainDepthRenderer from "../renderer/TerrainDepthRenderer.js";
import TerrainRenderer from "../renderer/TerrainRenderer.js";
import WaterRenderer from "../renderer/WaterRenderer.js";
import WireframeRenderer from "../renderer/WireframeRenderer.js";
import DefaultSprite from "../sprite/DefaultSprite.js";
import Flowers from "../sprite/Flowers.js";
import ReflectMap from "../sprite/ReflectMap.js";
import RenderMap from "../sprite/RenderMap.js";
import Water from "../sprite/Water.js";
import CacheManager from "./CacheManager.js";
import CameraManager from "./CameraManager.js";
import EventManager from "./EventManager.js";
import SceneManager from "./SceneManager.js";

export default class RendererManager {
    private readonly spriteRenderer = new SpriteRenderer;
    private readonly backSpriteRenderer = new BackSpriteRenderer;
    private readonly waterRenderer = new WaterRenderer;
    private readonly skyboxRenderer = new SkyboxRenderer;
    private readonly skyRenderer = new SkyRenderer;
    private readonly sdfRenderer = new SDFRenderer;
    private readonly lineRenderer = new LineRenderer;
    private readonly gltfMeshRenderer = new GLTFMeshRenderer;
    private readonly terrainRenderer = new TerrainRenderer;
    private readonly terrainDepthRenderer = new TerrainDepthRenderer;
    private readonly terrainCDLODRenderer = new TerrainCDLODRenderer;
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
        this.skyRenderer.setShaderName("Sky");
        this.sdfRenderer.setShaderName("SDF");
        this.lineRenderer.setShaderName("Line");
        this.gltfMeshRenderer.setShaderName("Mesh");
        this.terrainRenderer.setShaderName("Terrain");
        this.terrainDepthRenderer.setShaderName("TerrainDepth");
        this.terrainCDLODRenderer.setShaderName("TerrainCDLOD");
        this.wireframeRenderer.setShaderName("Wireframe");
        this.gltfSkinMeshRenderer.setShaderName("SkinMesh");
        this.pointRenderer.setShaderName("Point");
        this.waterRenderer.setShaderName("Water");
    }
    async load(): Promise<void> {


        await this.spriteRenderer.loadShaderTxtCache(this.getCacheManager());
        await this.backSpriteRenderer.loadShaderTxtCache(this.getCacheManager());
        await this.skyboxRenderer.loadShaderTxtCache(this.getCacheManager());
        await this.skyRenderer.loadShaderTxtCache(this.getCacheManager());
        await this.sdfRenderer.loadShaderTxtCache(this.getCacheManager());
        await this.lineRenderer.loadShaderTxtCache(this.getCacheManager());
        await this.gltfMeshRenderer.loadShaderTxtCache(this.getCacheManager());
        await this.terrainRenderer.loadShaderTxtCache(this.getCacheManager());
        await this.terrainDepthRenderer.loadShaderTxtCache(this.getCacheManager());
        await this.terrainCDLODRenderer.loadShaderTxtCache(this.getCacheManager());
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
        this.getEventManager().onEntityRender.renderEntity = this.renderEntity.bind(this);
        this.getEventManager().onViewPortChange.device = (this.getDevice());

    }
    initRenderer(): void {
        const rc = this.getDevice().getRenderingContext();
        rc.init();
        [
            this.gltfSkinMeshRenderer,
            this.gltfMeshRenderer,
            this.terrainRenderer,
            this.terrainCDLODRenderer,
            this.wireframeRenderer,
            this.skyboxRenderer,
            this.skyRenderer,
            this.waterRenderer,
        ].forEach(renderer => {
            renderer.setCamera(this.getCameraManager().getMainCamera());
            renderer.initShader(rc, this.getCacheManager());
            renderer.setSceneManager(this.getSceneManager());
        });
        [
            this.sdfRenderer,
            this.terrainDepthRenderer,
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
    renderEntity(entity: Entity) {

        if (entity.has(SDFCharacter)) {
            this.sdfRenderer.addObject(entity.get(SDFCharacter));
            this.lineRenderer.addObject(entity.get(Border));
        } else if (entity.has(Hamburger)) {
            this.lineRenderer.addObject(entity.get(Border));
        } else if (entity.has(DefaultSprite)) {
            this.spriteRenderer.addObject(entity.get(DefaultSprite));
        } else if (entity.has(Flowers)) {
            this.backSpriteRenderer.addObject(entity.get(Flowers));
        } else if (entity.has(Terrain)) {
            this.terrainRenderer.addObject(entity.get(Terrain));
        } else if (entity.has(TerrainDepth)) {
            this.terrainDepthRenderer.addObject(entity.get(TerrainDepth));
        } else if (entity.has(TerrainCDLOD)) {
            this.terrainCDLODRenderer.addObject(entity.get(TerrainCDLOD));
        } else if (entity.has(TerrainMesh)) {
            this.terrainRenderer.addObject(entity.get(TerrainMesh));
        } else if (entity.has(RenderMap)) {
            this.spriteRenderer.addObject(entity.get(RenderMap));
        } else if (entity.has(ReflectMap)) {
            this.spriteRenderer.addObject(entity.get(ReflectMap));
        } else if (entity.has(Pointer)) {
            this.pointRenderer.addObject(entity.get(Pointer));
        } else if (entity.has(HelloWireframe)) {
            this.wireframeRenderer.addObject(entity.get(HelloWireframe));
        } else if (entity.has(Skybox)) {
            this.skyboxRenderer.addObject(entity.get(Skybox));
        } else if (entity.has(Sky)) {
            this.skyRenderer.addObject(entity.get(Sky));
        } else if (entity.has(Water)) {
            this.waterRenderer.addObject(entity.get(Water));
        } else if (entity.has(GLTFAnimationController)) {
            const allMeshs = entity.all(Mesh);
            for (const mesh of allMeshs) {
                this.gltfSkinMeshRenderer.addObject(mesh);
            }
        } else if (entity.has(Mesh)) {
            const allMeshs = entity.all(Mesh);
            for (const mesh of allMeshs) {
                this.gltfMeshRenderer.addObject(mesh);
            }
        }
    }
    render(): void {
        this.getEventManager().onViewPortChange.notify();
        [
            this.skyboxRenderer,
            this.skyRenderer,
            this.backSpriteRenderer,
            this.spriteRenderer,
            this.lineRenderer,
            this.terrainRenderer,
            this.terrainDepthRenderer,
            this.terrainCDLODRenderer,
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
    getMeshRenderer() {
        return this.gltfMeshRenderer;
    }
    getTerrainRenderer() {
        return this.terrainRenderer;
    }
    getTerrainDepthRenderer() {
        return this.terrainDepthRenderer;
    }
    getSkyboxRenderer() {
        return this.skyboxRenderer;
    }
    getSkyRenderer() {
        return this.skyRenderer;
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