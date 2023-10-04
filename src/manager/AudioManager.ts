import AudioClip from "../audio/AudioClip.js";
import BleepAudio from "../audio/BleepAudio.js";
import DemoAudio from "../audio/DemoAudio.js";
import ArrayBufferCache from "../cache/ArrayBufferCache.js";
import OnClickPickSayHello from "../observer/OnClickPickSayHello.js";
import OnClickToggleAudio from "../observer/OnClickToggleAudio.js";
import Scene from "../scene/Scene.js";
import CacheManager from "./CacheManager.js";
import Manager from "./Manager.js";
import SceneManager from "./SceneManager.js";
export default class AudioManager extends Manager<AudioClip> {
    private context?: AudioContext;
    private sceneManager?: SceneManager;
    private cacheManager?: CacheManager;
    addObjects(): void {
        [
            DemoAudio,
            BleepAudio,
        ].forEach(ctor => {
            this.add<AudioClip>(ctor);
        });
    }
    async load(): Promise<void> {
        await this.getCacheManager().get(ArrayBufferCache).load("resources/audio/bleep.wav");
        this.get(BleepAudio).setBuffer(this.getCacheManager().get(ArrayBufferCache).get("resources/audio/bleep.wav"));
    }
    init() {
        this.context = this.getDevice().createWebAudioContext();
        this.all().forEach(clip => {
            clip.setContext(this.getAudioContext());
            clip.init();
        });
        this.getScene().getComponents(OnClickToggleAudio).forEach(comp => comp.setAudioClip(this.get(DemoAudio)));
        this.getScene().getComponents(OnClickPickSayHello).forEach(comp => comp.setAudioClip(this.get(BleepAudio)));
    }

    update(): void {
        this.all().forEach(clip => clip.update());
    }

    getAudioContext() {
        if (this.context === undefined) {
            throw new Error("audiocontext not exist")
        }
        return this.context;
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
    setCacheManager(cacheManager: CacheManager) {
        this.cacheManager = cacheManager;
    }
    getCacheManager(): CacheManager {
        if (this.cacheManager === undefined) {
            throw new Error("cacheManager is undefined");
        }
        return this.cacheManager;
    }
    getScene(): Scene {
        return this.getSceneManager().first();
    }
}


