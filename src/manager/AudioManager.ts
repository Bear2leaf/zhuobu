import BleepAudio from "../audio/BleepAudio.js";
import DemoAudio from "../audio/DemoAudio.js";
import MidiAudio from "../audio/MidiAudio.js";
import CacheManager from "./CacheManager.js";
export default class AudioManager {
    private readonly demoAudio = new DemoAudio;
    private readonly bleepAudio = new BleepAudio;
    private readonly midiAudio = new MidiAudio;
    private cacheManager?: CacheManager;
    setAudioContext(audioContext: AudioContext) {
        this.demoAudio.setContext(audioContext)
        this.bleepAudio.setContext(audioContext)
        this.midiAudio.setContext(audioContext)
    }
    async load(): Promise<void> {
        await this.getCacheManager().getArrayBufferCache().load("resources/audio/bleep.wav");
        await this.getCacheManager().getArrayBufferCache().load("resources/midi/town_theme.bin");
        this.bleepAudio.setBuffer(this.getCacheManager().getArrayBufferCache().get("resources/audio/bleep.wav"));
        this.midiAudio.setBuffer(this.getCacheManager().getArrayBufferCache().get("resources/midi/town_theme.bin"));
        await this.midiAudio.loadBuffer();
    }
    initAudio() {
        [
            this.demoAudio,
            this.bleepAudio,
            this.midiAudio
        ].forEach(clip => {
            clip.init();
        });
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
}


