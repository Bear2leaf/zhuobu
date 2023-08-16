import AudioClip from "../audio/AudioClip.js";
import BleepAudio from "../audio/BleepAudio.js";
import DemoAudio from "../audio/DemoAudio.js";
import GoodAudio from "../audio/GoodAudio.js";
import ArrayBufferCache from "../cache/ArrayBufferCache.js";
import OnClickToggleAudio from "../observer/OnClickToggleAudio.js";
import Scene from "../scene/Scene.js";
import CacheManager from "./CacheManager.js";
import Manager from "./Manager.js";
import SceneManager from "./SceneManager.js";
export default class AudioManager extends Manager<AudioClip> {
    private context?: AudioContext;
    private sceneManager?: SceneManager;
    private cacheManager?: CacheManager;
    getAudioContext() {
        if (this.context === undefined) {
            throw new Error("audiocontext not exist")
        }
        return this.context;
    }
    addObjects(): void {
        [
            DemoAudio,
            BleepAudio,
            GoodAudio
        ].forEach(ctor => {
            this.add<AudioClip>(ctor);
        });
    }
    async load(): Promise<void> {
        await this.getCacheManager().get(ArrayBufferCache).load("resources/audio/bleep.wav");
    }
    init() {
        this.context = this.getDevice().createWebAudioContext();
        this.all().forEach(clip => clip.setContext(this.getAudioContext()));
        this.get(BleepAudio).setBuffer(this.getCacheManager().get(ArrayBufferCache).get("resources/audio/bleep.wav"));
        this.all().forEach(clip => clip.init());
        this.getScene().getComponents(OnClickToggleAudio).forEach(comp => comp.setAudioClip(this.get(DemoAudio)));
    }
    
    update(): void {
        this.all().forEach(clip => clip.update());
    }

    // playBleepStuck() {
    //     const source = this.getAudioContext().createBufferSource();
    //     this.getAudioContext().decodeAudioData(decodeBase64ToArrayBuffer(breakout_stuck), buffer => {
    //         source.buffer = buffer;
    //         source.connect(this.getAudioContext().destination);
    //         source.start()
    //     }, console.error);
    // }
    // playPowerUp() {
    //     const source = this.getAudioContext().createBufferSource();
    //     this.getAudioContext().decodeAudioData(decodeBase64ToArrayBuffer(powerUp), buffer => {
    //         source.buffer = buffer;
    //         source.connect(this.getAudioContext().destination);
    //         source.start()
    //     }, console.error);
    // }
    // playSolid() {
    //     const source = this.getAudioContext().createBufferSource();
    //     this.getAudioContext().decodeAudioData(decodeBase64ToArrayBuffer(solid), buffer => {
    //         source.buffer = buffer;
    //         source.connect(this.getAudioContext().destination);
    //         source.start()
    //     }, console.error);
    // }
    // playBreakout() {
    //     const source = this.getAudioContext().createBufferSource();
    //     this.getAudioContext().decodeAudioData(decodeBase64ToArrayBuffer(breakout), buffer => {
    //         source.buffer = buffer;
    //         source.loop = true;
    //         source.connect(this.getAudioContext().destination);
    //         source.start()
    //     }, console.error);
    // }
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


