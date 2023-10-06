import AudioClip from "../audio/AudioClip.js";
import BleepAudio from "../audio/BleepAudio.js";
import DemoAudio from "../audio/DemoAudio.js";
import MidiAudio from "../audio/MidiAudio.js";
import ArrayBufferCache from "../cache/ArrayBufferCache.js";
import Device from "../device/Device.js";
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
    setDevice(device: Device): void {
        super.setDevice(device);
        this.context = device.createWebAudioContext();
    }
    addObjects(): void {
        [
            DemoAudio,
            BleepAudio,
            MidiAudio,
        ].forEach(ctor => {
            this.add<AudioClip>(ctor);
            if (this.context === undefined) {
                throw new Error("context is undefined");
            }
            this.get<AudioClip>(ctor).setContext(this.context);
        });
    }
    async load(): Promise<void> {
        await this.getCacheManager().get(ArrayBufferCache).load("resources/audio/bleep.wav");
        this.get(BleepAudio).setBuffer(this.getCacheManager().get(ArrayBufferCache).get("resources/audio/bleep.wav"));
        await this.getCacheManager().get(ArrayBufferCache).load("resources/midi/lame.bin");
        this.get(MidiAudio).setBuffer(this.getCacheManager().get(ArrayBufferCache).get("resources/midi/lame.bin"));
        await this.get(MidiAudio).loadBuffer();
    }
    init() {
        this.all().forEach(clip => {
            clip.init();
        });
        this.getScene().getComponents(OnClickToggleAudio).forEach(comp => comp.setAudioClip(this.get(DemoAudio)));
        this.getScene().getComponents(OnClickPickSayHello).forEach(comp => comp.setAudioClip(this.get(BleepAudio)));
        this.get(MidiAudio).playOnce();
    }

    update(): void {
        this.all().forEach(clip => clip.update());
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


