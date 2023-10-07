import { SongType } from "../audiofont/index.js";
import { MIDIFile } from "./midi.js";
import WebAudioFontPlayer from "./player.js";


export default class MidiInstance {

    private readonly audioContext: AudioContext;
    private readonly player: WebAudioFontPlayer = new WebAudioFontPlayer();
    private songStart = 0;
    private currentSongTime = 0;
    private nextStepTime = 0;
    private readonly output: GainNode;
    private nextPositionTime = 0;
    private loadedsong: Record<string, any> | null = null;
    private stop = false;
    private readonly stepDuration = 44 / 1000;
    constructor(audioContext: AudioContext) {
        this.audioContext = audioContext;
        this.output = audioContext.createGain();
        this.output.gain.value = 0.5;
    }
    startPlay() {
        this.stop = false;
        this.currentSongTime = 0;
        this.songStart = this.audioContext.currentTime;
        this.nextStepTime = this.audioContext.currentTime;
        this.tick();
    }
    tick() {
        if (this.stop || this.loadedsong === null) {
            return;
        }
        if (this.audioContext.currentTime > this.nextStepTime - this.stepDuration) {
            this.sendNotes(this.loadedsong, this.songStart, this.currentSongTime, this.currentSongTime + this.stepDuration, this.audioContext, this.output, this.player);
            this.currentSongTime = this.currentSongTime + this.stepDuration;
            this.nextStepTime = this.nextStepTime + this.stepDuration;
            if (this.currentSongTime > this.loadedsong.duration) {
                this.currentSongTime = this.currentSongTime - this.loadedsong.duration;
                this.sendNotes(this.loadedsong, this.songStart, 0, this.currentSongTime, this.audioContext, this.output, this.player);
                this.songStart = this.songStart + this.loadedsong.duration;
            }
        }
        if (this.nextPositionTime < this.audioContext.currentTime) {
            console.log("playing...", this.currentSongTime / this.loadedsong.duration);
            this.nextPositionTime = this.audioContext.currentTime + 3;
        }
    }
    sendNotes(song: SongType, songStart: number, start: number, end: number, audioContext: AudioContext, input: AudioNode, player: WebAudioFontPlayer) {
        for (let t = 0; t < song.tracks.length; t++) {
            const track = song.tracks[t];
            for (let i = 0; i < track.notes.length; i++) {
                if (track.notes[i].when >= start && track.notes[i].when < end) {
                    const when = this.songStart + track.notes[i].when;
                    let duration = track.notes[i].duration;
                    if (duration > 3) {
                        duration = 3;
                    }
                    const instr: string = track.info.variable;
                    const v = track.notes[i].velocity / 127;
                    player.queueWaveTable(this.audioContext, input, instr, when, track.notes[i].pitch, duration, v, track.notes[i].slides);
                }
            }
        }
        for (let b = 0; b < song.beats.length; b++) {
            const beat = song.beats[b];
            for (let i = 0; i < beat.notes.length; i++) {
                if (beat.notes[i].when >= start && beat.notes[i].when < end) {
                    const when = this.songStart + beat.notes[i].when;
                    const duration = 1.5;
                    const instr = beat.info.variable;
                    const v = beat.volume / 2;
                    player.queueWaveTable(this.audioContext, input, instr, when, beat.n, duration, v);
                }
            }
        }
    }
    async startLoad(song: Record<string, any>) {

        this.output.connect(this.audioContext.destination);
        // this.equalizer.output.connect(this.reverberator.input);
        // this.reverberator.output.connect(this.audioContext.destination);

        for (let i = 0; i < song.tracks.length; i++) {
            const nn = this.player.loader.findInstrument(song.tracks[i].program);
            const info = this.player.loader.instrumentInfo(nn);
            song.tracks[i].info = info;
            song.tracks[i].id = nn;
            await this.player.loader.startLoad(this.audioContext, info.url, info.variable);
        }
        for (let i = 0; i < song.beats.length; i++) {
            const nn = this.player.loader.findDrum(song.beats[i].n);
            const info = this.player.loader.drumInfo(nn);
            song.beats[i].info = info;
            song.beats[i].id = nn;
            await this.player.loader.startLoad(this.audioContext, info.url, info.variable);
        }
    }
    handleFileSelect(event: Event) {
        this.stop = true;
        const file = (event.target as HTMLInputElement).files![0];
        const fileReader = new FileReader();
        fileReader.onload = (progressEvent) => {
            const arrayBuffer = progressEvent.target?.result as ArrayBuffer;
            const midiFile = new MIDIFile(arrayBuffer);
            const song = midiFile.parseSong();
            this.startLoad(song);
            this.loadedsong = song
        };
        fileReader.readAsArrayBuffer(file);
    }
    async loadBuffer(buffer: ArrayBuffer) {
        this.stop = true;
        const midiFile = new MIDIFile(buffer);
        const song = midiFile.parseSong();
        await this.startLoad(song);
        this.loadedsong = song
    }
    stopPlay() {
        this.stop = true;
    }
}
