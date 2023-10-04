import AudioClip from "./AudioClip.js";



class TrackGenerator {
    private readonly sounds: OscillatorNode[];
    private readonly delayGain: GainNode;
    private readonly delay: DelayNode;
    private readonly mixer: GainNode;
    constructor(private readonly audioCtx: BaseAudioContext) {
        const sound1 = this.audioCtx.createOscillator();
        this.sounds = [sound1]
        const notes = [
            261.63,
            311.13,
            261.63,
            392.00,
            415.30,
            392.00,
            311.13,
            293.66,
            0
        ]
        const lowpass = this.audioCtx.createBiquadFilter()
        this.delayGain = this.audioCtx.createGain()
        this.delayGain.gain.value = 0.25;
        this.delay = this.audioCtx.createDelay(0.25)
        this.delay.delayTime.value = 0.25;
        this.delay.connect(this.delayGain)
        this.mixer = this.audioCtx.createGain()
        this.mixer.gain.value = 1;
        this.delayGain.connect(lowpass)
        lowpass.type = "notch";
        lowpass.frequency.setValueAtTime(10, audioCtx.currentTime);
        lowpass.gain.setValueAtTime(0.5, audioCtx.currentTime);
        notes.forEach((note, index) => {
            sound1.frequency.setValueAtTime(note, index / 2)
        })
        sound1.connect(this.delay)
        sound1.connect(lowpass)
        lowpass.connect(this.mixer)

    }
    start(when: number) {
        this.sounds.forEach((s) => {
            s.start(when)
        })
    }
    stop(when: number) {
        this.sounds.forEach((s) => {
            s.stop(when)
        })
    }

    connect(target: AudioNode) {
        this.mixer.connect(target)
    }
}
class MusicGenerator {
    private readonly tracks: TrackGenerator[]
    private readonly mixer: GainNode
    constructor(private readonly audioCtx: BaseAudioContext) {
        this.audioCtx = audioCtx

        const mixer = this.audioCtx.createGain()

        this.tracks = [new TrackGenerator(this.audioCtx)]

        this.mixer = mixer
    }

    start(when: number = this.audioCtx.currentTime) {
        this.tracks.forEach((t) => t.start(when))
    }

    stop(when: number = this.audioCtx.currentTime) {
        this.tracks.forEach((t) => t.stop(when))
    }

    connect(target: AudioDestinationNode) {
        this.tracks.forEach((t) => t.connect(this.mixer))
        this.mixer.connect(target)
    }
}

function generateSound(audioCtx: BaseAudioContext) {


    const soundGen = new TrackGenerator(audioCtx)
    soundGen.connect(audioCtx.destination)
    soundGen.start(0)

    return audioCtx
}



export default class GoodAudio implements AudioClip {
    private context?: AudioContext;
    private soundGen?: MusicGenerator;
    setContext(context: AudioContext) {
        this.context = context;
    }
    getContext() {
        if (this.context === undefined) {
            throw new Error("audiocontext not exist")
        }
        return this.context;
    }
    init() {
        // this.soundGen = new MusicGenerator(this.getContext());
        // this.playOnce();
    }
    playOnce(): void {
        this.getSoundGen().connect(this.getContext().destination)
        this.getSoundGen().start(0);
        this.getSoundGen().stop(5);

    }
    getSoundGen() {
        if (this.soundGen === undefined) {
            throw new Error("soundGen not exist")
        }
        return this.soundGen;
    }
    update() {
    }

}