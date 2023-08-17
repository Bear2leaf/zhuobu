import AudioClip from "./AudioClip.js";

const audioData = {
    songLen: 123,
    songData: [
        {
            osc1_oct: 9,
            osc1_det: 0,
            osc1_detune: 0,
            osc1_xenv: 0,
            osc1_vol: 161,
            osc1_waveform: 0,
            osc2_oct: 9,
            osc2_det: 0,
            osc2_detune: 4,
            osc2_xenv: 0,
            osc2_vol: 182,
            osc2_waveform: 0,
            noise_fader: 0,
            env_attack: 100,
            env_sustain: 1818,
            env_release: 18181,
            env_master: 192,
            fx_filter: 0,
            fx_freq: 0,
            fx_resonance: 254,
            fx_delay_time: 6,
            fx_delay_amt: 108,
            fx_pan_freq: 3,
            fx_pan_amt: 61,
            lfo_osc1_freq: 0,
            lfo_fx_freq: 0,
            lfo_freq: 3,
            lfo_amt: 94,
            lfo_waveform: 2,
            p: [
                1,
                2,
                1,
                2,
                1,
                2,
                1,
                2,
                1,
                2,
                1,
                2,
                1,
                2,
                1,
                2,
                0,
                2,
                3,
                4,
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                5
            ],
            c: [
                {
                    n: [
                        142,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        140,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        138,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0
                    ]
                },
                {
                    n: [
                        135,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        135,
                        0,
                        0,
                        0,
                        138,
                        0,
                        0,
                        0
                    ]
                },
                {
                    n: [
                        140,
                        0,
                        138,
                        0,
                        135,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        130,
                        0,
                        142,
                        0,
                        140,
                        0,
                        135,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        138,
                        0,
                        0,
                        0
                    ]
                },
                {
                    n: [
                        135,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        130,
                        0,
                        142,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        135,
                        0,
                        0,
                        0,
                        138,
                        0,
                        0,
                        0
                    ]
                },
                {
                    n: [
                        123,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0
                    ]
                },
                {
                    n: [
                        130,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0
                    ]
                },
                {
                    n: [
                        128,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0
                    ]
                },
                {
                    n: [
                        119,
                        131,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        126,
                        114,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0
                    ]
                }
            ]
        },
        {
            osc1_oct: 8,
            osc1_det: 0,
            osc1_detune: 0,
            osc1_xenv: 0,
            osc1_vol: 0,
            osc1_waveform: 0,
            osc2_oct: 8,
            osc2_det: 0,
            osc2_detune: 0,
            osc2_xenv: 0,
            osc2_vol: 0,
            osc2_waveform: 0,
            noise_fader: 19,
            env_attack: 100,
            env_sustain: 0,
            env_release: 3636,
            env_master: 192,
            fx_filter: 1,
            fx_freq: 8100,
            fx_resonance: 156,
            fx_delay_time: 2,
            fx_delay_amt: 22,
            fx_pan_freq: 3,
            fx_pan_amt: 43,
            lfo_osc1_freq: 0,
            lfo_fx_freq: 0,
            lfo_freq: 0,
            lfo_amt: 0,
            lfo_waveform: 0,
            p: [
                0,
                0,
                1,
                2,
                1,
                2,
                1,
                2,
                1,
                2,
                1,
                2,
                1,
                2,
                1,
                2,
                1,
                2,
                1,
                2,
                1,
                2,
                1,
                2,
                1,
                2,
                1,
                2
            ],
            c: [
                {
                    n: [
                        135,
                        0,
                        135,
                        0,
                        0,
                        135,
                        0,
                        135,
                        135,
                        0,
                        135,
                        0,
                        0,
                        135,
                        0,
                        135,
                        135,
                        0,
                        135,
                        0,
                        0,
                        135,
                        0,
                        135,
                        135,
                        0,
                        135,
                        0,
                        0,
                        135,
                        0,
                        135
                    ]
                },
                {
                    n: [
                        135,
                        0,
                        135,
                        0,
                        0,
                        135,
                        0,
                        135,
                        135,
                        0,
                        135,
                        0,
                        0,
                        135,
                        0,
                        135,
                        135,
                        0,
                        135,
                        0,
                        0,
                        135,
                        0,
                        135,
                        135,
                        0,
                        135,
                        0,
                        135,
                        0,
                        135,
                        135
                    ]
                }
            ]
        },
        {
            osc1_oct: 6,
            osc1_det: 0,
            osc1_detune: 0,
            osc1_xenv: 0,
            osc1_vol: 192,
            osc1_waveform: 1,
            osc2_oct: 8,
            osc2_det: 0,
            osc2_detune: 8,
            osc2_xenv: 0,
            osc2_vol: 82,
            osc2_waveform: 2,
            noise_fader: 0,
            env_attack: 100,
            env_sustain: 4545,
            env_release: 2727,
            env_master: 192,
            fx_filter: 3,
            fx_freq: 2700,
            fx_resonance: 85,
            fx_delay_time: 6,
            fx_delay_amt: 60,
            fx_pan_freq: 6,
            fx_pan_amt: 86,
            lfo_osc1_freq: 0,
            lfo_fx_freq: 1,
            lfo_freq: 7,
            lfo_amt: 106,
            lfo_waveform: 0,
            p: [
                0,
                0,
                0,
                0,
                1,
                1,
                2,
                3,
                1,
                1,
                2,
                3,
                1,
                1,
                2,
                3,
                1,
                1,
                2,
                3,
                1,
                1,
                2,
                3
            ],
            c: [
                {
                    n: [
                        135,
                        135,
                        147,
                        135,
                        0,
                        135,
                        147,
                        135,
                        135,
                        135,
                        147,
                        135,
                        0,
                        135,
                        147,
                        135,
                        135,
                        135,
                        147,
                        135,
                        0,
                        135,
                        147,
                        135,
                        135,
                        135,
                        147,
                        135,
                        0,
                        135,
                        147,
                        135
                    ]
                },
                {
                    n: [
                        140,
                        140,
                        152,
                        140,
                        0,
                        140,
                        152,
                        140,
                        140,
                        140,
                        152,
                        140,
                        0,
                        140,
                        152,
                        140,
                        140,
                        140,
                        152,
                        140,
                        0,
                        140,
                        152,
                        140,
                        140,
                        140,
                        152,
                        140,
                        0,
                        140,
                        152,
                        142
                    ]
                },
                {
                    n: [
                        131,
                        131,
                        143,
                        131,
                        0,
                        131,
                        143,
                        131,
                        131,
                        131,
                        143,
                        131,
                        0,
                        131,
                        143,
                        131,
                        138,
                        138,
                        150,
                        138,
                        0,
                        138,
                        150,
                        138,
                        138,
                        138,
                        150,
                        138,
                        0,
                        138,
                        150,
                        137
                    ]
                }
            ]
        },
        {
            osc1_oct: 7,
            osc1_det: 0,
            osc1_detune: 0,
            osc1_xenv: 0,
            osc1_vol: 187,
            osc1_waveform: 2,
            osc2_oct: 5,
            osc2_det: 0,
            osc2_detune: 2,
            osc2_xenv: 1,
            osc2_vol: 161,
            osc2_waveform: 2,
            noise_fader: 0,
            env_attack: 100,
            env_sustain: 1818,
            env_release: 2727,
            env_master: 123,
            fx_filter: 1,
            fx_freq: 1900,
            fx_resonance: 162,
            fx_delay_time: 2,
            fx_delay_amt: 153,
            fx_pan_freq: 6,
            fx_pan_amt: 61,
            lfo_osc1_freq: 0,
            lfo_fx_freq: 1,
            lfo_freq: 2,
            lfo_amt: 196,
            lfo_waveform: 3,
            p: [
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                1,
                1,
                1,
                2,
                1,
                1,
                1,
                2,
                1,
                1,
                1,
                2,
                1,
                1,
                1,
                2,
                1,
                1,
                1,
                2,
                3
            ],
            c: [
                {
                    n: [
                        135,
                        135,
                        138,
                        135,
                        142,
                        135,
                        140,
                        138,
                        135,
                        135,
                        138,
                        135,
                        142,
                        135,
                        140,
                        138,
                        135,
                        135,
                        138,
                        135,
                        142,
                        135,
                        140,
                        138,
                        135,
                        135,
                        138,
                        135,
                        142,
                        135,
                        140,
                        138
                    ]
                },
                {
                    n: [
                        143,
                        143,
                        155,
                        143,
                        0,
                        143,
                        155,
                        143,
                        143,
                        143,
                        150,
                        143,
                        147,
                        143,
                        140,
                        143,
                        138,
                        138,
                        143,
                        138,
                        143,
                        140,
                        138,
                        140,
                        138,
                        138,
                        143,
                        138,
                        142,
                        140,
                        138,
                        140
                    ]
                },
                {
                    n: [
                        135,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0
                    ]
                }
            ]
        },
        {
            osc1_oct: 8,
            osc1_det: 0,
            osc1_detune: 0,
            osc1_xenv: 1,
            osc1_vol: 192,
            osc1_waveform: 0,
            osc2_oct: 7,
            osc2_det: 0,
            osc2_detune: 0,
            osc2_xenv: 1,
            osc2_vol: 70,
            osc2_waveform: 2,
            noise_fader: 8,
            env_attack: 100,
            env_sustain: 0,
            env_release: 9090,
            env_master: 164,
            fx_filter: 2,
            fx_freq: 5500,
            fx_resonance: 240,
            fx_delay_time: 6,
            fx_delay_amt: 51,
            fx_pan_freq: 3,
            fx_pan_amt: 66,
            lfo_osc1_freq: 0,
            lfo_fx_freq: 0,
            lfo_freq: 0,
            lfo_amt: 0,
            lfo_waveform: 0,
            p: [
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1
            ],
            c: [
                {
                    n: [
                        135,
                        0,
                        0,
                        0,
                        0,
                        0,
                        135,
                        0,
                        0,
                        0,
                        135,
                        0,
                        0,
                        0,
                        0,
                        0,
                        135,
                        0,
                        0,
                        0,
                        0,
                        0,
                        135,
                        0,
                        0,
                        0,
                        135,
                        0,
                        0,
                        0,
                        0,
                        0
                    ]
                }
            ]
        },
        {
            osc1_oct: 7,
            osc1_det: 0,
            osc1_detune: 0,
            osc1_xenv: 0,
            osc1_vol: 192,
            osc1_waveform: 2,
            osc2_oct: 8,
            osc2_det: 0,
            osc2_detune: 6,
            osc2_xenv: 0,
            osc2_vol: 184,
            osc2_waveform: 2,
            noise_fader: 21,
            env_attack: 40000,
            env_sustain: 25454,
            env_release: 90909,
            env_master: 77,
            fx_filter: 2,
            fx_freq: 7100,
            fx_resonance: 188,
            fx_delay_time: 8,
            fx_delay_amt: 147,
            fx_pan_freq: 4,
            fx_pan_amt: 69,
            lfo_osc1_freq: 0,
            lfo_fx_freq: 1,
            lfo_freq: 7,
            lfo_amt: 176,
            lfo_waveform: 1,
            p: [
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                1,
                2,
                3,
                4,
                1,
                2,
                3,
                4,
                1,
                2,
                3,
                4,
                1,
                2,
                3,
                4,
                5
            ],
            c: [
                {
                    n: [
                        135,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0
                    ]
                },
                {
                    n: [
                        142,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0
                    ]
                },
                {
                    n: [
                        128,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0
                    ]
                },
                {
                    n: [
                        143,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        138,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0
                    ]
                },
                {
                    n: [
                        135,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0
                    ]
                }
            ]
        },
        {
            osc1_oct: 8,
            osc1_det: 0,
            osc1_detune: 0,
            osc1_xenv: 0,
            osc1_vol: 0,
            osc1_waveform: 0,
            osc2_oct: 8,
            osc2_det: 0,
            osc2_detune: 0,
            osc2_xenv: 0,
            osc2_vol: 0,
            osc2_waveform: 0,
            noise_fader: 148,
            env_attack: 3636,
            env_sustain: 4545,
            env_release: 39090,
            env_master: 136,
            fx_filter: 2,
            fx_freq: 3100,
            fx_resonance: 122,
            fx_delay_time: 5,
            fx_delay_amt: 132,
            fx_pan_freq: 0,
            fx_pan_amt: 0,
            lfo_osc1_freq: 0,
            lfo_fx_freq: 1,
            lfo_freq: 5,
            lfo_amt: 147,
            lfo_waveform: 0,
            p: [
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                1,
                2,
                1,
                3,
                1,
                2,
                1,
                3,
                4
            ],
            c: [
                {
                    n: [
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        135,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        135,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0
                    ]
                },
                {
                    n: [
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        135,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        162,
                        0,
                        135,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0
                    ]
                },
                {
                    n: [
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        135,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        151,
                        0,
                        0,
                        0,
                        0,
                        0,
                        135,
                        0,
                        135,
                        0,
                        0,
                        0,
                        0,
                        0
                    ]
                },
                {
                    n: [
                        135,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0
                    ]
                }
            ]
        }
    ],
    rowLen: 5606,
    endPattern: 30
}


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
    private readonly source: AudioBufferSourceNode; // Tips: cache source, prevent bufferSourceNode been gc, result in short sound play
    constructor(private readonly audioCtx: BaseAudioContext, instr: any, private readonly bpm: number, private readonly endPattern: number) {
        bpm = bpm || 118
        endPattern = endPattern || instr.p.length - 1
        let nextNote = 0
        let sounds: SoundWriter[] = []



        const songLen = 123;
        this.source = this.audioCtx.createBufferSource()

        const audioBuffer = this.audioCtx.createBuffer(2, this.audioCtx.sampleRate * songLen, this.audioCtx.sampleRate);

        const lchan = audioBuffer.getChannelData(0)
        const rchan = audioBuffer.getChannelData(1)

        sounds.slice().forEach((el) => {
            const finished = el.write(lchan, rchan, 0)
            if (finished) {
                sounds = sounds.filter((el2) => {
                    return el2 !== el
                })
            }
        })

        let nextNoteSample = nextNote * effectiveRowLen(this.audioCtx, this.bpm)
        //replace while loop with requestAnimationFrame to avoid blocking
        const process = () => {
            const pattern = instr.p[Math.floor(nextNote / 32) % (this.endPattern + 1)] || 0
            const note = pattern === 0 ? 0 : (instr.c[pattern - 1] || { n: [] }).n[nextNote % 32] || 0
            if (note !== 0) {
                const sw = new SoundWriter(this.audioCtx, instr, note, this.bpm)
                sw.write(lchan, rchan, nextNoteSample)
                sounds.push(sw)
            }
            nextNote += 1
            nextNoteSample = nextNote * effectiveRowLen(this.audioCtx, this.bpm)
            if (nextNoteSample < audioBuffer.length) {
                requestAnimationFrame(() => process())
            } else {
                (this.audioCtx as AudioContext).resume();
            }
        }
        process()
        this.source.buffer = audioBuffer
        const delayTime = instr.fx_delay_time * ((1 / (this.bpm / 60)) / 8)
        const delayAmount = instr.fx_delay_amt / 255

        const delayGain = this.audioCtx.createGain()
        delayGain.gain.value = delayAmount
        this.source.connect(delayGain)

        const delay = this.audioCtx.createDelay(delayTime)
        delay.delayTime.value = delayTime
        delayGain.connect(delay)
        delay.connect(delayGain)

        const mixer = this.audioCtx.createGain()
        mixer.gain.value = 1
        this.source.connect(mixer)
        delay.connect(mixer)

        this.chain = [this.source, delayGain, delay, mixer]
    }
    start(when: number) {
        (this.chain[0] as AudioBufferSourceNode).start(when)
    }

    stop(when: number) {
        (this.chain[0] as AudioBufferSourceNode).stop(when)
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

function generateSong(audioCtx: AudioContext, song: any) {


    const soundGen = new MusicGenerator(audioCtx, song)
    soundGen.connect(audioCtx.destination)
    soundGen.start(0)
    return soundGen;

}

let isPlaying = false;


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
        this.playOnce();
    }
    playOnce(): void {
        if (!isPlaying) {
            this.soundGen = generateSong(this.getContext(), audioData);
            isPlaying = true;
        }
    }

    update() {
    }

}