import WhaleGLTF from "../model/WhaleGLTF.js";
import HelloGLTF from "../model/HelloGLTF.js";
import HelloMultiGLTF from "../model/HelloMultiGLTF.js";
import CacheManager from "./CacheManager.js";
import SceneManager from "./SceneManager.js";
import HelloWireframe from "../drawobject/HelloWireframe.js";
import HelloMultiMesh from "../drawobject/HelloMultiMesh.js";
import Mesh from "../drawobject/Mesh.js";


export default class GLTFManager {
    private cacheManager?: CacheManager;
    private sceneManager?: SceneManager;
    private readonly whaleGLTF: WhaleGLTF = new WhaleGLTF();
    private readonly helloGLTF: HelloGLTF = new HelloGLTF();
    private readonly helloMultiGLTF: HelloMultiGLTF = new HelloMultiGLTF();
    async load(): Promise<void> {
        await this.getCacheManager().loadGLTFCache("whale.CYCLES");
        await this.getCacheManager().loadGLTFCache("hello");
        await this.getCacheManager().loadGLTFCache("hello-multi");
    }
    initGLTF(): void {
        this.whaleGLTF.setName("whale.CYCLES");
        this.helloGLTF.setName("hello");
        this.helloMultiGLTF.setName("hello-multi");

        this.whaleGLTF.setBufferCache(this.getCacheManager().getArrayBufferCache());
        this.helloGLTF.setBufferCache(this.getCacheManager().getArrayBufferCache());
        this.helloMultiGLTF.setBufferCache(this.getCacheManager().getArrayBufferCache());

        this.whaleGLTF.init(this.getCacheManager().getGLTF(this.whaleGLTF.getName()));
        this.helloGLTF.init(this.getCacheManager().getGLTF(this.helloGLTF.getName()));
        this.helloMultiGLTF.init(this.getCacheManager().getGLTF(this.helloMultiGLTF.getName()));

        this.getSceneManager().first().getComponents(Mesh).forEach(mesh => mesh.setGLTF(this.whaleGLTF.clone()));
        this.getSceneManager().first().getComponents(HelloWireframe).forEach(mesh => mesh.setGLTF(this.helloGLTF.clone()));
        this.getSceneManager().first().getComponents(HelloMultiMesh).forEach(mesh => mesh.setGLTF(this.helloMultiGLTF.clone()));
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
}