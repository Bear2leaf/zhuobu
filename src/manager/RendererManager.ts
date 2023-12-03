import { ViewPortType } from "../device/Device.js";
import BackSpriteRenderer from "../renderer/BackSpriteRenderer.js";
import GLTFMeshRenderer from "../renderer/GLTFMeshRenderer.js";
import GLTFSkinMeshRenderer from "../renderer/GLTFSkinMeshRenderer.js";
import { LineRenderer } from "../renderer/LineRenderer.js";
import { PointRenderer } from "../renderer/PointRenderer.js";
import Renderer from "../renderer/Renderer.js";
import SDFRenderer from "../renderer/SDFRenderer.js";
import SpriteRenderer from "../renderer/SpriteRenderer.js";
import { VertexColorTriangleRenderer } from "../renderer/VertexColorTriangleRenderer.js";
import WireframeRenderer from "../renderer/WireframeRenderer.js";
import Scene from "../scene/Scene.js";
import CacheManager from "./CacheManager.js";
import CameraManager from "./CameraManager.js";
import Manager from "./Manager.js";
import SceneManager from "./SceneManager.js";

export default class RendererManager extends Manager<Renderer> {
    private cacheManager?: CacheManager;
    private sceneManager?: SceneManager;
    private cameraManager?: CameraManager;
    addObjects(): void {

        [
            SpriteRenderer
            , BackSpriteRenderer
            , SDFRenderer
            , VertexColorTriangleRenderer
            , LineRenderer
            , GLTFMeshRenderer
            , WireframeRenderer
            , GLTFSkinMeshRenderer
            , PointRenderer
        ].forEach(ctor => {
            this.add(ctor);
        });

        this.get(SpriteRenderer).setShaderName("Sprite");
        this.get(BackSpriteRenderer).setShaderName("Sprite");
        this.get(SDFRenderer).setShaderName("SDF");
        this.get(VertexColorTriangleRenderer).setShaderName("VertexColorTriangle");
        this.get(LineRenderer).setShaderName("Line");
        this.get(GLTFMeshRenderer).setShaderName("Mesh");
        this.get(WireframeRenderer).setShaderName("Wireframe");
        this.get(GLTFSkinMeshRenderer).setShaderName("SkinMesh");
        this.get(PointRenderer).setShaderName("Point");
    }
    async load(): Promise<void> {
        for await (const renderer of this.all()) {
            await renderer.loadShaderTxtCache(this.getCacheManager());
        }

    }
    init(): void {
        const rc = this.getDevice().getRenderingContext();
        rc.init();
        for (const renderer of this.all()) {
            renderer.initShader(rc, this.getCacheManager());
            renderer.setSceneManager(this.getSceneManager());
            renderer.initRenderingContext(rc);
            renderer.initCamera(this.getCameraManager());
        }
    }
    update(): void {
    }
    render(): void {

        this.getDevice().viewportTo(ViewPortType.Full);
        this.all().forEach(renderer => {
            if (renderer instanceof GLTFSkinMeshRenderer) {
                renderer.render();
            } else if (renderer instanceof GLTFMeshRenderer) {
                renderer.render();
            } else if (renderer instanceof WireframeRenderer) {
                renderer.render();
            } else if (renderer instanceof SDFRenderer) {
                renderer.render();
            } else if (renderer instanceof PointRenderer) {
                renderer.render();
            } else if (renderer instanceof SpriteRenderer) {
                renderer.render();
            } else if (renderer instanceof BackSpriteRenderer) {
                renderer.render();
            }
        });
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