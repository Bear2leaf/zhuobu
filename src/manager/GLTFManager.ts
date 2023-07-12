import ArrayBufferCache from "../cache/ArrayBufferCache.js";
import JSONCache from "../cache/FontInfoCache.js";
import Mesh from "../drawobject/Mesh.js";
import SkinMesh from "../drawobject/SkinMesh.js";
import GLTF from "../gltf/GLTF.js";
import GLTFMeshRenderer from "../renderer/GLTFMeshRenderer.js";
import GLTFSkinMeshRenderer from "../renderer/GLTFSkinMeshRenderer.js";
import DemoScene from "../scene/DemoScene.js";
import Scene from "../scene/Scene.js";
import CacheManager from "./CacheManager.js";
import Manager from "./Manager.js";
import SceneManager from "./SceneManager.js";


export default class GLTFManager extends Manager<GLTF> {
    private cacheManager?: CacheManager;
    private sceneManager?: SceneManager;
    addObjects(): void {
        [
            GLTF,
        ].forEach((ctor) => {
            this.add(ctor);
        });
    }
    async load(): Promise<void> {
        await this.getCacheManager().loadGLTFCache("whale.CYCLES");
        await this.getCacheManager().loadGLTFCache("hello");
        await this.getCacheManager().loadGLTFCache("hello-multi");
        
    }
    init(): void {
        this.get(GLTF).setName("whale.CYCLES");
        this.get(GLTF).setBufferCache(this.getCacheManager().get(ArrayBufferCache));
        this.get(GLTF).setGLTFCache(this.getCacheManager().get(JSONCache));
        this.getScene().getComponents(GLTFMeshRenderer).forEach(renderer => {
            renderer.getEntity().get(Mesh).setGLTF(this.get(GLTF));
        });
        this.getScene().getComponents(GLTFSkinMeshRenderer).forEach(renderer => {
            renderer.getEntity().get(SkinMesh).setGLTF(this.get(GLTF));
        });
        this.get(GLTF).init();
    }
    update(): void {

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