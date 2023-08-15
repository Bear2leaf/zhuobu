import AudioClip from "../audio/AudioClip.js";
import BleepAudio from "../audio/BleepAudio.js";
import DemoAudio from "../audio/DemoAudio.js";
import OnClickToggleAudio from "../observer/OnClickToggleAudio.js";
import Scene from "../scene/Scene.js";
import Manager from "./Manager.js";
import SceneManager from "./SceneManager.js";
export default class AudioManager extends Manager<AudioClip> {
    private context?: AudioContext;
    private sceneManager?: SceneManager;
    getAudioContext() {
        if (this.context === undefined) {
            throw new Error("audiocontext not exist")
        }
        return this.context;
    }
    addObjects(): void {
        [
            DemoAudio,
            BleepAudio
        ].forEach(ctor => {
            this.add<AudioClip>(ctor);
        });
    }
    async load(): Promise<void> {
    }
    init() {
        this.context = this.getDevice().createWebAudioContext();
        this.all().forEach(clip => clip.setContext(this.getAudioContext()));
        this.all().forEach(clip => clip.init());
        this.getScene().getComponents(OnClickToggleAudio).forEach(comp => comp.setAudioClip(this.get(DemoAudio)));
    }
    
    update(): void {
        this.all().forEach(clip => clip.update());
    }

    // playBleepStuck() {
    //     const source = this.getAudioContext().createBufferSource();
    //     this.getAudioContext().decodeAudioData(decodeBase64ToArrayBuffer(bleep_stuck), buffer => {
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
    getScene(): Scene {
        return this.getSceneManager().first();
    }
}


