import DemoAudio from "../audio/DemoAudio.js";
import DemoSubject from "../subject/OnClickSubject.js";
import Observer from "./Observer.js";

export default class OnClickToggleAudio extends Observer {
    private subject?: DemoSubject;
    private audioClip?: DemoAudio;

    setAudioClip(audioClip: DemoAudio) {
        this.audioClip = audioClip;
    }
    getAudioClip() {
        if (!this.audioClip) throw new Error("audioClip is not set!");
        return this.audioClip;
    }

    init(): void {
        
        console.debug("OnClickToggleAudio", "is inited!");
    }

    public notify(): void {
        this.getAudioClip().togglePlay();
    }

    getSubject(): DemoSubject {
        if (!this.subject) throw new Error("subject is not set!");
        return this.subject;
    }

    setSubject(subject: DemoSubject) {
        this.subject = subject;
    }
}
