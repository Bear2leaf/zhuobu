
// Oscillators
function osc_sin(value: number) {
    return Math.sin(value * Math.PI * 2)
}

function osc_square(value: number) {
    if (osc_sin(value) < 0) {
        return -1
    }
    return 1
}

function osc_saw(value: number) {
    return (value % 1) - 0.5
}

function osc_tri(value: number) {
    const v2 = (value % 1) * 4
    if (v2 < 2) {
        return v2 - 1
    }
    return 3 - v2
}

// Array of oscillator functions
const oscillators =
    [
        osc_sin,
        osc_square,
        osc_saw,
        osc_tri
    ]

function getnotefreq44100(n: number) {
    const val = 0.00390625 * Math.pow(1.059463094, n - 128)
    return val
}

function getnotefreq(audioCtx: BaseAudioContext, n: number) {
    const x = getnotefreq44100(n)
    const val = (x / audioCtx.sampleRate) * 44100
    return val
}

function effectiveRowLen(audioCtx: BaseAudioContext, bpm: number) {
    return Math.round((60 * audioCtx.sampleRate / 4) / bpm)
}


class SoundWriter {
    private readonly n: number
    private readonly bpm: number
    private c1: number
    private c2: number
    private low: number
    private band: number
    private j: number
    constructor(private readonly audioCtx: BaseAudioContext, private readonly instr: any, n: number, bpm: number) {
        this.audioCtx = audioCtx
        this.instr = instr
        this.n = n
        this.bpm = bpm

        this.c1 = 0
        this.c2 = 0
        this.low = 0
        this.band = 0
        this.j = 0
    }

    write(lchan: Float32Array, rchan: Float32Array, from: number) {
        const instr = this.instr
        const n = this.n
        let c = from

        const osc_lfo = oscillators[instr.lfo_waveform]
        const osc1 = oscillators[instr.osc1_waveform]
        const osc2 = oscillators[instr.osc2_waveform]
        const panFreq = Math.pow(2, instr.fx_pan_freq - 8) / effectiveRowLen(this.audioCtx, this.bpm)
        const lfoFreq = Math.pow(2, instr.lfo_freq - 8) / effectiveRowLen(this.audioCtx, this.bpm)

        const attackTime = instr.env_attack / 44100
        const releaseTime = instr.env_release / 44100
        const sustainTime = instr.env_sustain / 44100

        const env_attack = attackTime * this.audioCtx.sampleRate
        const env_release = releaseTime * this.audioCtx.sampleRate
        const env_sustain = sustainTime * this.audioCtx.sampleRate

        // Precalculate frequencues
        const o1t = getnotefreq(this.audioCtx, n + (instr.osc1_oct - 8) * 12 + instr.osc1_det) * (1 + 0.0008 * instr.osc1_detune)
        const o2t = getnotefreq(this.audioCtx, n + (instr.osc2_oct - 8) * 12 + instr.osc2_det) * (1 + 0.0008 * instr.osc2_detune)

        // State variable init
        const q = instr.fx_resonance / 255

        while (this.j < env_attack + env_sustain + env_release && c < lchan.length) {
            // LFO
            const lfor = osc_lfo(this.j * lfoFreq) * instr.lfo_amt / 512 + 0.5

            // Envelope
            let e = 1
            if (this.j < env_attack) {
                e = this.j / env_attack
            } else if (this.j >= env_attack + env_sustain) {
                e -= (this.j - env_attack - env_sustain) / env_release
            }

            // Oscillator 1
            let t = o1t
            if (instr.lfo_osc1_freq) {
                t += lfor
            }
            if (instr.osc1_xenv) {
                t *= e * e
            }
            this.c1 += t
            let rsample = osc1(this.c1) * instr.osc1_vol

            // Oscillator 2
            t = o2t
            if (instr.osc2_xenv) {
                t *= e * e
            }
            this.c2 += t
            rsample += osc2(this.c2) * instr.osc2_vol

            // Noise oscillator
            if (instr.noise_fader) {
                rsample += (2 * Math.random() - 1) * instr.noise_fader * e
            }

            rsample *= e / 255

            // State variable filter
            let f = instr.fx_freq
            if (instr.lfo_fx_freq) {
                f *= lfor
            }
            f = 1.5 * Math.sin(f * Math.PI / this.audioCtx.sampleRate)
            this.low += f * this.band
            const high = q * (rsample - this.band) - this.low
            this.band += f * high
            switch (instr.fx_filter) {
                case 1: // Hipass
                    rsample = high
                    break
                case 2: // Lopass
                    rsample = this.low
                    break
                case 3: // Bandpass
                    rsample = this.band
                    break
                case 4: // Notch
                    rsample = this.low + high
                    break
                default:
            }

            // Panning & master volume
            t = osc_sin(this.j * panFreq) * instr.fx_pan_amt / 512 + 0.5
            rsample *= 39 * instr.env_master

            let x = 32768 + rsample * (1 - t)
            let x1 = x & 255
            let x2 = (x >> 8) & 255
            let y = 4 * (x1 + (x2 << 8) - 32768)
            y = y < -32768 ? -32768 : (y > 32767 ? 32767 : y)
            lchan[c] = lchan[c] + (y / 32768)

            x = 32768 + rsample * (t)
            x1 = x & 255
            x2 = (x >> 8) & 255
            y = 4 * (x1 + (x2 << 8) - 32768)
            y = y < -32768 ? -32768 : (y > 32767 ? 32767 : y)
            rchan[c] = rchan[c] + (y / 32768)

            this.j++
            c++
        }

        // returns true if the sound finished
        if (c < lchan.length) {
            return true
        }
        return false
    }
}
class TrackGenerator {
    private readonly chain: AudioNode[]
    constructor(private readonly audioCtx: BaseAudioContext, instr: any, private readonly bpm: number, private readonly endPattern: number) {
        bpm = bpm || 118
        endPattern = endPattern || instr.p.length - 1
        let currentSample = 0
        let nextNote = 0
        let sounds: SoundWriter[] = []
        const onaudioprocess = (inputData: AudioBuffer) => {
            const lchan = inputData.getChannelData(0)
            const rchan = inputData.getChannelData(1)

            sounds.slice().forEach((el) => {
                const finished = el.write(lchan, rchan, 0)
                if (finished) {
                    sounds = sounds.filter((el2) => {
                        return el2 !== el
                    })
                }
            })

            let nextNoteSample = nextNote * effectiveRowLen(this.audioCtx, this.bpm)
            while (nextNoteSample >= currentSample &&
                nextNoteSample < currentSample + inputData.length) {
                const pattern = instr.p[Math.floor(nextNote / 32) % (this.endPattern + 1)] || 0
                const note = pattern === 0 ? 0 : (instr.c[pattern - 1] || { n: [] }).n[nextNote % 32] || 0
                if (note !== 0) {
                    const sw = new SoundWriter(this.audioCtx, instr, note, this.bpm)
                    sw.write(lchan, rchan, nextNoteSample - currentSample)
                    sounds.push(sw)
                }
                nextNote += 1
                nextNoteSample = nextNote * effectiveRowLen(this.audioCtx, this.bpm)
            }

            currentSample += inputData.length
        }
        const songLen = 123;
        const source = this.audioCtx.createBufferSource()
        const audioBuffer = this.audioCtx.createBuffer(2, this.audioCtx.sampleRate * songLen, this.audioCtx.sampleRate);
        onaudioprocess(audioBuffer);
        source.buffer = audioBuffer

        const delayTime = instr.fx_delay_time * ((1 / (this.bpm / 60)) / 8)
        const delayAmount = instr.fx_delay_amt / 255

        const delayGain = this.audioCtx.createGain()
        delayGain.gain.value = delayAmount
        source.connect(delayGain)

        const delay = this.audioCtx.createDelay()
        delay.delayTime.value = delayTime
        delayGain.connect(delay)
        delay.connect(delayGain)

        const mixer = this.audioCtx.createGain()
        mixer.gain.value = 1
        source.connect(mixer)
        delay.connect(mixer)

        this.chain = [source, delayGain, delay, mixer]
    }
    start(when: number) {
        (this.chain[0] as OscillatorNode).start(when)
    }

    stop(when: number) {
        (this.chain[0] as OscillatorNode).stop(when)
        this.chain[this.chain.length - 1].disconnect()
    }

    connect(target: AudioNode) {
        this.chain[this.chain.length - 1].connect(target)
    }
}

class MusicGenerator {
    private readonly tracks: TrackGenerator[]
    private readonly mixer: GainNode
    constructor(private readonly audioCtx: BaseAudioContext, private readonly song: { songData: any[], rowLen: number, endPattern: number }) {
        this.audioCtx = audioCtx
        this.song = song

        const mixer = this.audioCtx.createGain()
        mixer.gain.value = 1

        this.tracks = []

        this.song.songData.forEach((el) => {
            const track = new TrackGenerator(this.audioCtx, el, this.bpm, this.song.endPattern)
            track.connect(mixer)
            this.tracks.push(track)
        })

        this.mixer = mixer
    }

    get bpm() {
        // rowLen is a number of samples when using 44100hz
        return Math.round((60 * 44100 / 4) / this.song.rowLen)
    }

    start(when: number = this.audioCtx.currentTime) {
        this.tracks.forEach((t) => t.start(when))
    }

    stop(when: number = this.audioCtx.currentTime) {
        this.tracks.forEach((t) => t.stop(when))
        this.mixer.disconnect()
    }

    connect(target: AudioDestinationNode) {
        this.mixer.connect(target)
    }
}

function generateSound(instr: any, n: number, bpm = 120) {

    const nInstr = Object.assign({}, instr)
    nInstr.p = [1, 0, 0, 0]
    nInstr.c = [{
        n: new Array(32).map(() => 0)
    }]
    nInstr.c[0].n[0] = n + 75

    const audioCtx = new AudioContext()

    const soundGen = new TrackGenerator(audioCtx, nInstr, bpm, 0)
    soundGen.connect(audioCtx.destination)
    soundGen.start(0)

    return audioCtx
}

export default function generateSong(song: any) {

    const audioCtx = new AudioContext()

    setTimeout(() => {
        const soundGen = new MusicGenerator(audioCtx, song)
        soundGen.connect(audioCtx.destination)
        soundGen.start(0)
    }, 1000);

}