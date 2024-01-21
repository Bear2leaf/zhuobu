import HelloGLTF from "../model/HelloGLTF.js";
import HelloMultiGLTF from "../model/HelloMultiGLTF.js";
import CacheManager from "./CacheManager.js";
import SceneManager from "./SceneManager.js";
import EventManager from "./EventManager.js";
import IslandGLTF from "../model/IslandGLTF.js";


export default class GLTFManager {
    private cacheManager?: CacheManager;
    private sceneManager?: SceneManager;
    private eventManager?: EventManager;
    readonly helloGLTF: HelloGLTF = new HelloGLTF();
    readonly islandGLTF: IslandGLTF = new IslandGLTF();
    async load(): Promise<void> {
        await this.getCacheManager().loadGLTFCache(this.helloGLTF.getName());
        await this.getCacheManager().loadGLTFCache(this.islandGLTF.getName());
    }
    setBufferCaches() {
        this.helloGLTF.setBufferCache(this.getCacheManager().getArrayBufferCache());
        this.islandGLTF.setBufferCache(this.getCacheManager().getArrayBufferCache());
        this.islandGLTF.setImageCache(this.getCacheManager().getImageCache());
    }
    initObservers() {
        this.getEventManager().onEntityInit.setGLTFManager(this);
    }
    initGLTFs(): void {
        this.helloGLTF.init(this.getCacheManager().getGLTF(this.helloGLTF.getName()))
        this.islandGLTF.init(this.getCacheManager().getGLTF(this.islandGLTF.getName()))

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