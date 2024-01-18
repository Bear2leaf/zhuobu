import WhaleGLTF from "../model/WhaleGLTF.js";
import HelloGLTF from "../model/HelloGLTF.js";
import HelloMultiGLTF from "../model/HelloMultiGLTF.js";
import CacheManager from "./CacheManager.js";
import SceneManager from "./SceneManager.js";
import EventManager from "./EventManager.js";
import TerrianGLTF from "../model/TerrianGLTF.js";
import RockGLTF from "../model/RockGLTF.js";
import EagleGLTF from "../model/EagleGLTF.js";


export default class GLTFManager {
    private cacheManager?: CacheManager;
    private sceneManager?: SceneManager;
    private eventManager?: EventManager;
    readonly whaleGLTF: WhaleGLTF = new WhaleGLTF();
    readonly helloGLTF: HelloGLTF = new HelloGLTF();
    readonly helloMultiGLTF: HelloMultiGLTF = new HelloMultiGLTF();
    readonly terrianGLTF: TerrianGLTF = new TerrianGLTF();
    readonly rockGLTF: RockGLTF = new RockGLTF();
    readonly eagleGLTF: EagleGLTF = new EagleGLTF();
    async load(): Promise<void> {
        await this.getCacheManager().loadGLTFCache(this.whaleGLTF.getName());
        await this.getCacheManager().loadGLTFCache(this.helloGLTF.getName());
        await this.getCacheManager().loadGLTFCache(this.helloMultiGLTF.getName());
        await this.getCacheManager().loadGLTFCache(this.terrianGLTF.getName());
    }
    setBufferCaches() {
        this.whaleGLTF.setBufferCache(this.getCacheManager().getArrayBufferCache());
        this.helloGLTF.setBufferCache(this.getCacheManager().getArrayBufferCache());
        this.helloMultiGLTF.setBufferCache(this.getCacheManager().getArrayBufferCache());
        this.terrianGLTF.setBufferCache(this.getCacheManager().getArrayBufferCache());
        this.terrianGLTF.setImageCache(this.getCacheManager().getImageCache());
        this.rockGLTF.setBufferCache(this.getCacheManager().getArrayBufferCache());
        this.rockGLTF.setImageCache(this.getCacheManager().getImageCache());
        this.eagleGLTF.setBufferCache(this.getCacheManager().getArrayBufferCache());
        this.eagleGLTF.setImageCache(this.getCacheManager().getImageCache());
    }
    initObservers() {
        this.getEventManager().onEntityInit.setGLTFManager(this);
    }
    initGLTFs(): void {
        this.whaleGLTF.init(this.getCacheManager().getGLTF(this.whaleGLTF.getName()))
        this.helloGLTF.init(this.getCacheManager().getGLTF(this.helloGLTF.getName()))
        this.helloMultiGLTF.init(this.getCacheManager().getGLTF(this.helloMultiGLTF.getName()))
        this.terrianGLTF.init(this.getCacheManager().getGLTF(this.terrianGLTF.getName()))
        this.rockGLTF.init(this.getCacheManager().getGLTF(this.rockGLTF.getName()))
        this.eagleGLTF.init(this.getCacheManager().getGLTF(this.eagleGLTF.getName()))

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