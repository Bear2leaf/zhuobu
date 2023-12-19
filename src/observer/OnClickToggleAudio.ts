import DemoAudio from "../audio/DemoAudio.js";
import Observer from "./Observer.js";

export default class OnClickToggleAudio extends Observer {
    private audioClip?: DemoAudio;
    setAudioClip(audioClip: DemoAudio) {
        this.audioClip = audioClip;
    }
    getAudioClip() {
        if (!this.audioClip) throw new Error("audioClip is not set!");
        return this.audioClip;
    }

    init(): void {
        // console.debug("OnClickToggleAudio", "is inited!");
        this.getSubject().register(this);
    }

    public notify(): void {
        this.getAudioClip().togglePlay();
    }

}
