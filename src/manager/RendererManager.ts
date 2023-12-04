import Device, { ViewPortType } from "../device/Device.js";
import BackSpriteRenderer from "../renderer/BackSpriteRenderer.js";
import GLTFMeshRenderer from "../renderer/GLTFMeshRenderer.js";
import GLTFSkinMeshRenderer from "../renderer/GLTFSkinMeshRenderer.js";
import { LineRenderer } from "../renderer/LineRenderer.js";
import { PointRenderer } from "../renderer/PointRenderer.js";
import SDFRenderer from "../renderer/SDFRenderer.js";
import SpriteRenderer from "../renderer/SpriteRenderer.js";
import { VertexColorTriangleRenderer } from "../renderer/VertexColorTriangleRenderer.js";
import WireframeRenderer from "../renderer/WireframeRenderer.js";
import CacheManager from "./CacheManager.js";
import CameraManager from "./CameraManager.js";
import SceneManager from "./SceneManager.js";

export default class RendererManager {
    private readonly spriteRenderer = new SpriteRenderer;
    private readonly backSpriteRenderer = new BackSpriteRenderer;
    private readonly sdfRenderer = new SDFRenderer;
    private readonly vertexColorTriangleRenderer = new VertexColorTriangleRenderer;
    private readonly lineRenderer = new LineRenderer;
    private readonly gltfMeshRenderer = new GLTFMeshRenderer;
    private readonly wireframeRenderer = new WireframeRenderer;
    private readonly gltfSkinMeshRenderer = new GLTFSkinMeshRenderer;
    private readonly pointRenderer = new PointRenderer;
    private cacheManager?: CacheManager;
    private sceneManager?: SceneManager;
    private cameraManager?: CameraManager;
    private device?: Device;
    initShaderName() {
        this.spriteRenderer.setShaderName("Sprite");
        this.backSpriteRenderer.setShaderName("Sprite");
        this.sdfRenderer.setShaderName("SDF");
        this.vertexColorTriangleRenderer.setShaderName("VertexColorTriangle");
        this.lineRenderer.setShaderName("Line");
        this.gltfMeshRenderer.setShaderName("Mesh");
        this.wireframeRenderer.setShaderName("Wireframe");
        this.gltfSkinMeshRenderer.setShaderName("SkinMesh");
        this.pointRenderer.setShaderName("Point");
    }
    async load(): Promise<void> {


        await this.spriteRenderer.loadShaderTxtCache(this.getCacheManager());
        await this.backSpriteRenderer.loadShaderTxtCache(this.getCacheManager());
        await this.sdfRenderer.loadShaderTxtCache(this.getCacheManager());
        await this.vertexColorTriangleRenderer.loadShaderTxtCache(this.getCacheManager());
        await this.lineRenderer.loadShaderTxtCache(this.getCacheManager());
        await this.gltfMeshRenderer.loadShaderTxtCache(this.getCacheManager());
        await this.wireframeRenderer.loadShaderTxtCache(this.getCacheManager());
        await this.gltfSkinMeshRenderer.loadShaderTxtCache(this.getCacheManager());
        await this.pointRenderer.loadShaderTxtCache(this.getCacheManager());

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
    initRenderer(): void {
        const rc = this.getDevice().getRenderingContext();
        rc.init();
        [
            this.gltfSkinMeshRenderer,
            this.gltfMeshRenderer,
            this.wireframeRenderer,
            this.sdfRenderer,
            this.pointRenderer,
            this.spriteRenderer,
            this.backSpriteRenderer,
        ].forEach(renderer => {
            renderer.initShader(rc, this.getCacheManager());
            renderer.setSceneManager(this.getSceneManager());
            renderer.initRenderingContext(rc);
            renderer.setCamera(this.getCameraManager().getMainCamera());
        });
        this.pointRenderer.setCamera(this.getCameraManager().getUICamera());
        this.backSpriteRenderer.setCamera(this.getCameraManager().getBackgroundCamera());
        this.spriteRenderer.setCamera(this.getCameraManager().getFrontgroundCamera());
    }
    render(): void {
        this.getDevice().viewportTo(ViewPortType.Full);
        this.gltfSkinMeshRenderer.render();
        this.gltfMeshRenderer.render();
        this.wireframeRenderer.render();
        this.sdfRenderer.render();
        this.pointRenderer.render();
        this.spriteRenderer.render();
        this.backSpriteRenderer.render();
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
}