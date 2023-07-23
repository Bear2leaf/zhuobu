import ArrayBufferCache from "../cache/ArrayBufferCache.js";
import JSONCache from "../cache/FontInfoCache.js";
import GLTF from "../gltf/GLTF.js";
import WhaleGLTF from "../gltf/object/WhaleGLTF.js";
import HelloGLTF from "../gltf/object/HelloGLTF.js";
import HelloMultiGLTF from "../gltf/object/HelloMultiGLTF.js";
import Scene from "../scene/Scene.js";
import CacheManager from "./CacheManager.js";
import Manager from "./Manager.js";
import SceneManager from "./SceneManager.js";
import HelloMesh from "../drawobject/HelloMesh.js";
import HelloMultiMesh from "../drawobject/HelloMultiMesh.js";
import Mesh from "../drawobject/Mesh.js";
import Node from "../component/Node.js";


export default class GLTFManager extends Manager<GLTF> {
    private cacheManager?: CacheManager;
    private sceneManager?: SceneManager;
    addObjects(): void {
        [
            WhaleGLTF,
            HelloGLTF,
            HelloMultiGLTF,
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
        this.all().forEach(gltf => {
            gltf.setBufferCache(this.getCacheManager().get(ArrayBufferCache));
            gltf.setGLTFCache(this.getCacheManager().get(JSONCache));
            gltf.init();
        });
        this.getScene().getComponents(Mesh).forEach(mesh => mesh.setGLTF(this.get(WhaleGLTF).clone()));
        this.getScene().getComponents(HelloMesh).forEach(mesh => mesh.setGLTF(this.get(HelloGLTF).clone()));
        this.getScene().getComponents(HelloMultiMesh).forEach(mesh => mesh.setGLTF(this.get(HelloMultiGLTF).clone()));
    }
    update(): void {
        this.getScene().getComponents(Mesh).forEach(mesh => mesh.getEntity().get(Node).updateWorldMatrix());
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