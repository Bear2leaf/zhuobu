import { adr } from "./adr.js";
import { AudioLibrary } from "./audioLibrary.js";

/**
 * Module that takes care of audio playback
 */
export default class AudioEngine {
    static FADE_TIME = 1;
    static AUDIO_BUFFER_CACHE: Record<string, AudioBuffer> = {};
    static _audioContext: AudioContext;
    static _master: GainNode;
    static _currentBackgroundMusic: EffectAudio;
    static _currentEventAudio: EffectAudio | null;
    static _currentSoundEffectAudio: EffectAudio | null;
    static _initialized = false;
    static init() {
        AudioEngine._initAudioContext();
        // AudioEngine._preloadAudio(); // removed to save bandwidth
        AudioEngine._initialized = true;
    };
    static _preloadAudio() {
        // start loading music and events early
        // ** could be used later if we specify a better set of
        // audio files to preload -- i.e. we probably don't need to load
        // the later villages or events audio, and esp. not the ending
        for (const key in AudioLibrary) {
            if (
                key.toString().indexOf('MUSIC_') > -1 ||
                key.toString().indexOf('EVENT_') > -1) {
                AudioEngine.loadAudioFile(AudioLibrary[key]);
            }
        }
    };
    static _initAudioContext() {
        AudioEngine._audioContext = new (adr.AudioContext);
        AudioEngine._createMasterChannel();
    };
    static _createMasterChannel() {
        // create master
        AudioEngine._master = AudioEngine._audioContext.createGain();
        AudioEngine._master.gain.setValueAtTime(1.0, AudioEngine._audioContext.currentTime);
        AudioEngine._master.connect(AudioEngine._audioContext.destination);
    };
    static _getMissingAudioBuffer() {
        // plays beeping sound to indicate missing audio
        const buffer = AudioEngine._audioContext.createBuffer(
            1,
            AudioEngine._audioContext.sampleRate,
            AudioEngine._audioContext.sampleRate
        );
        // Fill the buffer
        const bufferData = buffer.getChannelData(0);
        for (let i = 0; i < buffer.length / 2; i++) {
            bufferData[i] = Math.sin(i * 0.05) / 4; // max .25 gain value
        }
        return buffer;
    };
    static _playSound(buffer: AudioBuffer) {
        if (AudioEngine._currentSoundEffectAudio &&
            AudioEngine._currentSoundEffectAudio.source.buffer === buffer) {
            return;
        }

        const source = AudioEngine._audioContext.createBufferSource();
        source.buffer = buffer;
        source.onended = function (event) {
            // dereference current sound effect when finished
            if (AudioEngine._currentSoundEffectAudio &&
                AudioEngine._currentSoundEffectAudio.source.buffer === buffer) {
                AudioEngine._currentSoundEffectAudio = null;
            }
        };

        source.connect(AudioEngine._master);
        source.start();

        AudioEngine._currentSoundEffectAudio = {
            source: source
        };
    };
    static _playBackgroundMusic(buffer: AudioBuffer) {
        const source = AudioEngine._audioContext.createBufferSource();
        source.buffer = buffer;
        source.loop = true;

        const envelope = AudioEngine._audioContext.createGain();
        envelope.gain.setValueAtTime(0.0, AudioEngine._audioContext.currentTime);

        const fadeTime = AudioEngine._audioContext.currentTime + AudioEngine.FADE_TIME;

        // fade out current background music
        if (AudioEngine._currentBackgroundMusic &&
            AudioEngine._currentBackgroundMusic.source) {
            if (!AudioEngine._currentBackgroundMusic.envelope) {
                throw new Error('current background music envelope is null');
            }
            const currentBackgroundGainValue = AudioEngine._currentBackgroundMusic.envelope.gain.value;
            AudioEngine._currentBackgroundMusic.envelope.gain.cancelScheduledValues(AudioEngine._audioContext.currentTime);
            AudioEngine._currentBackgroundMusic.envelope.gain.setValueAtTime(currentBackgroundGainValue, AudioEngine._audioContext.currentTime);
            AudioEngine._currentBackgroundMusic.envelope.gain.linearRampToValueAtTime(0.0, fadeTime);
            AudioEngine._currentBackgroundMusic.source.stop(fadeTime + 0.3); // make sure fade has completed
        }

        // fade in new backgorund music
        source.connect(envelope);
        envelope.connect(AudioEngine._master);
        source.start();
        envelope.gain.linearRampToValueAtTime(1.0, fadeTime);

        // update current background music
        AudioEngine._currentBackgroundMusic = {
            source: source,
            envelope: envelope
        };
    };
    static _playEventMusic(buffer: AudioBuffer) {
        const source = AudioEngine._audioContext.createBufferSource();
        source.buffer = buffer;
        source.loop = true;

        const envelope = AudioEngine._audioContext.createGain();
        envelope.gain.setValueAtTime(0.0, AudioEngine._audioContext.currentTime);

        const fadeTime = AudioEngine._audioContext.currentTime + AudioEngine.FADE_TIME * 2;

        // turn down current background music
        if (AudioEngine._currentBackgroundMusic !== null) {
            if (!AudioEngine._currentBackgroundMusic.envelope) {
                throw new Error('current background music envelope is null');
            }
            const currentBackgroundGainValue = AudioEngine._currentBackgroundMusic.envelope.gain.value;
            AudioEngine._currentBackgroundMusic.envelope.gain.cancelScheduledValues(AudioEngine._audioContext.currentTime);
            AudioEngine._currentBackgroundMusic.envelope.gain.setValueAtTime(currentBackgroundGainValue, AudioEngine._audioContext.currentTime);
            AudioEngine._currentBackgroundMusic.envelope.gain.linearRampToValueAtTime(0.2, fadeTime);
        }

        // fade in event music
        source.connect(envelope);
        envelope.connect(AudioEngine._master);
        source.start();
        envelope.gain.linearRampToValueAtTime(1.0, fadeTime);

        // update reference
        AudioEngine._currentEventAudio = {
            source: source,
            envelope: envelope
        };
    };
    static _stopEventMusic() {
        const fadeTime = AudioEngine._audioContext.currentTime + AudioEngine.FADE_TIME * 2;

        // fade out event music and stop
        if (AudioEngine._currentEventAudio &&
            AudioEngine._currentEventAudio.source &&
            AudioEngine._currentEventAudio.source.buffer) {
            if (!AudioEngine._currentEventAudio.envelope) {
                throw new Error('current background music envelope is null');
            }
            const currentEventGainValue = AudioEngine._currentEventAudio.envelope.gain.value;
            AudioEngine._currentEventAudio.envelope.gain.cancelScheduledValues(AudioEngine._audioContext.currentTime);
            AudioEngine._currentEventAudio.envelope.gain.setValueAtTime(currentEventGainValue, AudioEngine._audioContext.currentTime);
            AudioEngine._currentEventAudio.envelope.gain.linearRampToValueAtTime(0.0, fadeTime);
            AudioEngine._currentEventAudio.source.stop(fadeTime + 1); // make sure fade has completed
            AudioEngine._currentEventAudio = null;
        }

        // turn up background music
        if (AudioEngine._currentBackgroundMusic) {
            if (!AudioEngine._currentBackgroundMusic.envelope) {
                throw new Error('current background music envelope is null');
            }
            const currentBackgroundGainValue = AudioEngine._currentBackgroundMusic.envelope.gain.value;
            AudioEngine._currentBackgroundMusic.envelope.gain.cancelScheduledValues(AudioEngine._audioContext.currentTime);
            AudioEngine._currentBackgroundMusic.envelope.gain.setValueAtTime(currentBackgroundGainValue, AudioEngine._audioContext.currentTime);
            AudioEngine._currentBackgroundMusic.envelope.gain.linearRampToValueAtTime(1.0, fadeTime);
        }
    };
    static isAudioContextRunning() {
        return AudioEngine._audioContext.state !== 'suspended';
    };
    static tryResumingAudioContext() {
        if (AudioEngine._audioContext.state === 'suspended') {
            AudioEngine._audioContext.resume();
        }
    };
    static playBackgroundMusic(src: string) {
        if (!AudioEngine._initialized || !src) {
            return;
        }
        AudioEngine.loadAudioFile(src)
            .then(function (buffer) {
                AudioEngine._playBackgroundMusic(buffer);
            });
    };
    static playEventMusic(src: string) {
        if (!AudioEngine._initialized) {
            return;
        }
        AudioEngine.loadAudioFile(src)
            .then(function (buffer) {
                AudioEngine._playEventMusic(buffer);
            });
    };
    static stopEventMusic() {
        if (!AudioEngine._initialized) {
            return;
        }
        AudioEngine._stopEventMusic();
    };
    static playSound(src: string) {
        if (!AudioEngine._initialized || !src) {
            return;
        }
        AudioEngine.loadAudioFile(src)
            .then(function (buffer) {
                AudioEngine._playSound(buffer);
            });
    };
    static loadAudioFile(src: string) {
        if (AudioEngine.AUDIO_BUFFER_CACHE[src]) {
            return new Promise<AudioBuffer>(function (resolve, reject) {
                resolve(AudioEngine.AUDIO_BUFFER_CACHE[src]);
            });
        } else {
            const request = new Request(src);
            return fetch(request).then(function (response) {
                return response.arrayBuffer();
            }).then(function (buffer) {
                if (buffer.byteLength === 0) {
                    console.error('cannot load audio from ' + src);
                    return AudioEngine._getMissingAudioBuffer();
                }

                const decodeAudioDataPromise = AudioEngine._audioContext.decodeAudioData(buffer, function (decodedData) {
                    AudioEngine.AUDIO_BUFFER_CACHE[src] = decodedData;
                    return AudioEngine.AUDIO_BUFFER_CACHE[src];
                });

                // Safari WebAudio does not return a promise based API for
                // decodeAudioData, so we need to fake it if we want to play
                // audio immediately on first fetch
                if (decodeAudioDataPromise) {
                    return decodeAudioDataPromise;
                } else {
                    return new Promise<AudioBuffer>(function (resolve, reject) {
                        const fakePromiseId = adr.setInterval(function () {
                            if (AudioEngine.AUDIO_BUFFER_CACHE[src]) {
                                resolve(AudioEngine.AUDIO_BUFFER_CACHE[src]);
                                adr.clearInterval(fakePromiseId);
                            }
                        }, 20);
                    });
                }
            });
        }
    };
    static setBackgroundMusicVolume(volume?: number, s?: number) {
        if (AudioEngine._master === null) return;  // master may not be ready yet
        if (volume === undefined) {
            volume = 1.0;
        }
        if (s === undefined) {
            s = 1.0;
        }

        if (!AudioEngine._currentBackgroundMusic.envelope) {
            throw new Error('current background music is null');
        }
        // cancel any current schedules and then ramp
        const currentBackgroundGainValue = AudioEngine._currentBackgroundMusic.envelope.gain.value;
        AudioEngine._currentBackgroundMusic.envelope.gain.cancelScheduledValues(AudioEngine._audioContext.currentTime);
        AudioEngine._currentBackgroundMusic.envelope.gain.setValueAtTime(currentBackgroundGainValue, AudioEngine._audioContext.currentTime);
        AudioEngine._currentBackgroundMusic.envelope.gain.linearRampToValueAtTime(
            volume,
            AudioEngine._audioContext.currentTime + s
        );
    };
    static setMasterVolume(volume?: number, s?: number) {
        if (AudioEngine._master === null) return;  // master may not be ready yet
        if (volume === undefined) {
            volume = 1.0;
        }
        if (s === undefined) {
            s = 1.0;
        }

        // cancel any current schedules and then ramp
        const currentGainValue = AudioEngine._master.gain.value;
        AudioEngine._master.gain.cancelScheduledValues(AudioEngine._audioContext.currentTime);
        AudioEngine._master.gain.setValueAtTime(currentGainValue, AudioEngine._audioContext.currentTime);
        AudioEngine._master.gain.linearRampToValueAtTime(
            volume,
            AudioEngine._audioContext.currentTime + s
        );
    }
};
