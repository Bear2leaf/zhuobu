import GLContainer from "../container/GLContainer.js";
import { ViewPortType } from "../device/Device.js";
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
import Manager from "./Manager.js";
import SceneManager from "./SceneManager.js";

export default class RendererManager extends Manager<Renderer> {
    private cacheManager?: CacheManager;
    private sceneManager?: SceneManager;
    addObjects(): void {
        
        [
            SpriteRenderer
            , SDFRenderer
            , PointRenderer
            , VertexColorTriangleRenderer
            , LineRenderer
            , GLTFMeshRenderer
            , WireframeRenderer
            , GLTFSkinMeshRenderer
        ].forEach(ctor => {
        this.add(ctor);
        this.get(ctor).setShaderName(ctor.name.replace("Renderer", "").replace("GLTF", ""));
    });
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
            renderer.setSceneManager(this.getSceneManager());
            renderer.initShader(rc, this.getCacheManager());
            renderer.initPrimitive(rc);
            renderer.bindEntityRenderer(rc);
        }
    }
    update(): void {
        this.getDevice().viewportTo(ViewPortType.Full);
        this.getScene().getComponents(Renderer).forEach(renderer => renderer.render());
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
    getScene(): Scene {
        return this.getSceneManager().first();
    }
}