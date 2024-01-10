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
        await this.getCacheManager().loadSoundFontCache("0000_GeneralUserGS");
        await this.getCacheManager().loadSoundFontCache("0460_GeneralUserGS");
        await this.getCacheManager().loadSoundFontCache("0730_GeneralUserGS");
        const soundCache = {
            "_tone_0000_GeneralUserGS_sf2_file": this.getCacheManager().getSoundfont("0000_GeneralUserGS"),
            "_tone_0460_GeneralUserGS_sf2_file": this.getCacheManager().getSoundfont("0460_GeneralUserGS"),
            "_tone_0730_GeneralUserGS_sf2_file": this.getCacheManager().getSoundfont("0730_GeneralUserGS"),
        }
        this.midiAudio.getInstance().setSoundCache(soundCache);
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
        this.bleepAudio.setBuffer(this.getCacheManager().getArrayBufferCache().get("resources/audio/bleep.wav"));
    }
    process() {
        [
            this.demoAudio,
            this.bleepAudio,
            this.midiAudio
        ].forEach(clip => {
            clip.update();
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


