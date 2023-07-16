import FontInfoContainer from "../component/FontInfoContainer.js";
import GLContainer from "../component/GLContainer.js";
import { ViewPortType } from "../device/Device.js";
import GLTFMeshRenderer from "../renderer/GLTFMeshRenderer.js";
import GLTFSkinMeshRenderer from "../renderer/GLTFSkinMeshRenderer.js";
import { PointRenderer } from "../renderer/PointRenderer.js";
import SpriteRenderer from "../renderer/SpriteRenderer.js";
import { TriangleRenderer } from "../renderer/TriangleRenderer.js";
import Scene from "../scene/Scene.js";
import CacheManager from "./CacheManager.js";
import Manager from "./Manager.js";
import SceneManager from "./SceneManager.js";

export default class RendererManager extends Manager<unknown> {
    private cacheManager?: CacheManager;
    private sceneManager?: SceneManager;
    addObjects(): void {
    }
    async load(): Promise<void> {
        await this.getCacheManager().loadShaderTxtCache("Sprite");
        await this.getCacheManager().loadShaderTxtCache("Point");
        await this.getCacheManager().loadShaderTxtCache("VertexColorTriangle");
        await this.getCacheManager().loadShaderTxtCache("SkinMesh");
        await this.getCacheManager().loadShaderTxtCache("Mesh");

    }
    init(): void {
        this.getDevice().gl.init();
        const { gl } = this.getDevice();
        const vs = this.getCacheManager().getVertShaderTxt("Sprite");
        const fs = this.getCacheManager().getFragShaderTxt("Sprite");
        const pvs = this.getCacheManager().getVertShaderTxt("Point");
        const pfs = this.getCacheManager().getFragShaderTxt("Point");
        const tvs = this.getCacheManager().getVertShaderTxt("VertexColorTriangle");
        const tfs = this.getCacheManager().getFragShaderTxt("VertexColorTriangle");
        const smvs = this.getCacheManager().getVertShaderTxt("SkinMesh");
        const smfs = this.getCacheManager().getFragShaderTxt("SkinMesh");
        const mvs = this.getCacheManager().getVertShaderTxt("Mesh");
        const mfs = this.getCacheManager().getFragShaderTxt("Mesh");
        const fontInfo = this.getCacheManager().getFontInfo("boxy_bold_font");
        this.getScene().getComponents(SpriteRenderer).forEach(renderer => renderer.setShader(gl.makeShader(vs, fs)));
        this.getScene().getComponents(PointRenderer).forEach(renderer => renderer.setShader(gl.makeShader(pvs, pfs)));
        this.getScene().getComponents(TriangleRenderer).forEach(renderer => renderer.setShader(gl.makeShader(tvs, tfs)));

        this.getScene().getComponents(GLContainer).forEach(renderer => renderer.setRenderingContext(gl));

        this.getScene().getComponents(GLTFMeshRenderer).forEach(skinMeshRenderer => {
            skinMeshRenderer.setShader(gl.makeShader(mvs, mfs));
        });
        this.getScene().getComponents(GLTFSkinMeshRenderer).forEach(skinMeshRenderer => {
            skinMeshRenderer.setShader(gl.makeShader(smvs, smfs));
        });


        this.getScene().getComponents(FontInfoContainer).forEach(renderer => renderer.setFontInfo(fontInfo));


        
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
        return this.getSceneManager().first();
    }
}