import MidiInstance from "../midi/MIDIInstance.js";
import AudioClip from "./AudioClip.js";
export default class MidiAudio implements AudioClip {
    private context?: AudioContext;
    private buffer?: ArrayBuffer;
    private instance?: MidiInstance;
    setContext(context: AudioContext) {
        this.context = context;
        this.instance = new MidiInstance(context);
    }
    getContext() {
        if (this.context === undefined) {
            throw new Error("audiocontext not exist")
        }
        return this.context;
    }
    setBuffer(buffer: ArrayBuffer) {
        this.buffer = buffer;
    }
    getBuffer() {
        if (this.buffer === undefined) {
            throw new Error("buffer not exist")
        }
        return this.buffer;
    }
    setInstance(instance: MidiInstance) {
        this.instance = instance;
    }
    getInstance() {
        if (this.instance === undefined) {
            throw new Error("instance not exist")
        }
        return this.instance;
    }
    init() {
        this.playOnce();
    }
    async loadBuffer() {
        await this.getInstance().loadBuffer(this.getBuffer());
    }

    update(): void {
        this.getInstance().loop();
        this.getInstance().tick();
    }

    playOnce() {
        this.getInstance().startPlay();
    }
}