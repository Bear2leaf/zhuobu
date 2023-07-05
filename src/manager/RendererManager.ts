import FontInfoContainer from "../component/FontInfoContainer.js";
import GLContainer from "../component/GLContainer.js";
import { ViewPortType } from "../device/Device.js";
import { PointRenderer } from "../renderer/PointRenderer.js";
import SpriteRenderer from "../renderer/SpriteRenderer.js";
import DemoScene from "../scene/DemoScene.js";
import Scene from "../scene/Scene.js";
import CacheManager from "./CacheManager.js";
import Manager from "./Manager.js";
import SceneManager from "./SceneManager.js";

export default class RendererManager extends Manager<unknown> {
    private cacheManager?: CacheManager;
    private sceneManager?: SceneManager;
    private ready = false;
    init(): void {
        this.getDevice().gl.init();
        console.log("RendererManager init");
    }
    update(): void {
        if (!this.ready) {
            const { gl } = this.getDevice();
            const vs = this.getCacheManager().getVertShaderTxt("Sprite");
            const fs = this.getCacheManager().getFragShaderTxt("Sprite");
            const pvs = this.getCacheManager().getVertShaderTxt("Point");
            const pfs = this.getCacheManager().getFragShaderTxt("Point");
            const fontInfo = this.getCacheManager().getFontInfo("boxy_bold_font");
            this.getScene().getComponents(SpriteRenderer).forEach(renderer => renderer.setShader(gl.makeShader(vs, fs)));
            this.getScene().getComponents(PointRenderer).forEach(renderer => renderer.setShader(gl.makeShader(pvs, pfs)));
            this.getScene().getComponents(GLContainer).forEach(renderer => renderer.setRenderingContext(gl));
            this.getScene().getComponents(FontInfoContainer).forEach(renderer => renderer.setFontInfo(fontInfo));
            this.ready = true;
        }
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