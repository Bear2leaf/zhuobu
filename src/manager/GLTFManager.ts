import WhaleGLTF from "../model/WhaleGLTF.js";
import HelloGLTF from "../model/HelloGLTF.js";
import HelloMultiGLTF from "../model/HelloMultiGLTF.js";
import CacheManager from "./CacheManager.js";
import SceneManager from "./SceneManager.js";
import EventManager from "./EventManager.js";
import OnEntityInit from "../observer/OnEntityInit.js";
import GLTF from "../gltf/GLTF.js";


export default class GLTFManager {
    private cacheManager?: CacheManager;
    private sceneManager?: SceneManager;
    private eventManager?: EventManager;
    readonly whaleGLTF: WhaleGLTF = new WhaleGLTF();
    readonly helloGLTF: HelloGLTF = new HelloGLTF();
    readonly helloMultiGLTF: HelloMultiGLTF = new HelloMultiGLTF();
    async load(): Promise<void> {
        await this.getCacheManager().loadGLTFCache("whale.CYCLES");
        await this.getCacheManager().loadGLTFCache("hello");
        await this.getCacheManager().loadGLTFCache("hello-multi");
        await this.getCacheManager().loadGLTFCache("island");
    }
    setGLTFNames() {
        this.whaleGLTF.setName("whale.CYCLES");
        this.helloGLTF.setName("hello");
        this.helloMultiGLTF.setName("island");
        // this.helloMultiGLTF.setName("hello-multi");

    }
    setBufferCaches() {
        this.whaleGLTF.setBufferCache(this.getCacheManager().getArrayBufferCache());
        this.helloGLTF.setBufferCache(this.getCacheManager().getArrayBufferCache());
        this.helloMultiGLTF.setBufferCache(this.getCacheManager().getArrayBufferCache());
    }
    initObservers() {
        this.getEventManager().onEntityInit.setGLTFManager(this);
    }
    initGLTF(gltf: GLTF): void {
        gltf.init(this.getCacheManager().getGLTF(gltf.getName()));

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
    setEventManager(eventManager: EventManager) {
        this.eventManager = eventManager;
    }
    getEventManager(): EventManager {
        if (this.eventManager === undefined) {
            throw new Error("eventManager is undefined");
        }
        return this.eventManager;
    }
}