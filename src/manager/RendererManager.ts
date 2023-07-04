import { ViewPortType } from "../device/Device.js";
import { PointRenderer } from "../renderer/PointRenderer.js";
import Renderer from "../renderer/Renderer.js";
import SpriteRenderer from "../renderer/SpriteRenderer.js";
import DemoScene from "../scene/DemoScene.js";
import Scene from "../scene/Scene.js";
import CacheManager from "./CacheManager.js";
import Manager from "./Manager.js";
import SceneManager from "./SceneManager.js";

export default class RendererManager extends Manager<unknown> {
    private cacheManager?: CacheManager;
    private sceneManager?: SceneManager;
    init(): void {
        const vs = this.getCacheManager().getVertShaderTxt("Sprite");
        const fs = this.getCacheManager().getFragShaderTxt("Sprite");
        const pvs = this.getCacheManager().getVertShaderTxt("Point");
        const pfs = this.getCacheManager().getFragShaderTxt("Point");
        const gl = this.getDevice().gl;
        gl.init();
        this.getScene().getComponents(SpriteRenderer).forEach(renderer => renderer.setShader(gl.makeShader(vs, fs)));
        this.getScene().getComponents(PointRenderer).forEach(renderer => renderer.setShader(gl.makeShader(pvs, pfs)));
        console.log("RendererManager init");
    }
    update(): void {
        this.getDevice().viewportTo(ViewPortType.Full);
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
        return this.getSceneManager().get(DemoScene);
    }
}