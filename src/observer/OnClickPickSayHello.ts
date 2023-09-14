import Observer from "./Observer.js";
import DemoSubject from "../subject/DemoSubject.js";
import Mesh from "../drawobject/Mesh.js";
import BleepAudio from "../audio/BleepAudio.js";

export default class OnClickPickSayHello extends Observer {
    private subject?: DemoSubject;
    private audioClip?: BleepAudio;
    public notify(): void {
        console.debug("Hello Pick! " + this.getEntity().get(Mesh).getGLTF().getName())
        this.getAudioClip().playOnce();
    }
    setAudioClip(audioClip: BleepAudio) {
        this.audioClip = audioClip;
    }
    getAudioClip() {
        if (!this.audioClip) throw new Error("audioClip is not set!");
        return this.audioClip;
    }
    getSubject(): DemoSubject {
        if (!this.subject) throw new Error("subject is not set!");
        return this.subject;
    }

    setSubject(subject: DemoSubject) {
        this.subject = subject;
    }

}