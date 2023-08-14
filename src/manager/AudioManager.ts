import AudioClip from "../audio/AudioClip.js";
import BleepAudio from "../audio/BleepAudio.js";
import DemoAudio from "../audio/DemoAudio.js";
import Manager from "./Manager.js";
export default class AudioManager extends Manager<AudioClip> {
    private context?: AudioContext;
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
    }
    private frames = 0;
    update(): void {
        if (this.context === undefined) {
            throw new Error("audiocontext not exist")
        }
        this.frames++;
        if (this.frames > 440) {
            this.get(BleepAudio).playOnce();
            this.frames = 0;
        }
        if (this.frames % 60 === 0) {
            this.get(DemoAudio).playOnce();
        }
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
}


