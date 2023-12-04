import BaseTouchSubject from "../subject/BaseTouchSubject.js";
import Mesh from "../drawobject/Mesh.js";
import BleepAudio from "../audio/BleepAudio.js";
import Observer from "./Observer.js";

export default class OnClickPickSayHello extends Observer {
    private subject?: BaseTouchSubject;
    private audioClip?: BleepAudio;
    init(): void {
        console.debug("OnClickPickSayHello", "is inited!");
        this.getSubject().register(this);
    }
    public notify(): void {
        // console.debug("Hello Pick! " + this.getEntity().get(Mesh).getGLTF().getName())
        this.getAudioClip().playOnce();
    }
    setAudioClip(audioClip: BleepAudio) {
        this.audioClip = audioClip;
    }
    getAudioClip() {
        if (!this.audioClip) throw new Error("audioClip is not set!");
        return this.audioClip;
    }
    getSubject(): BaseTouchSubject {
        if (!this.subject) throw new Error("subject is not set!");
        return this.subject;
    }

    setSubject(subject: BaseTouchSubject) {
        this.subject = subject;
    }

}