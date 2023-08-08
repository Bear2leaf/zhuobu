import DemoAudio from "../audio/DemoAudio.js";
import OnClickSubject from "../subject/OnClickSubject.js";
import Observer from "./Observer.js";

export default class OnClickToggleAudio extends Observer {
    private subject?: OnClickSubject;

    init(): void {
        
        console.log("OnClickToggleAudio", "is inited!");
    }

    public notify(): void {
        this.getEntity().get(DemoAudio).togglePlay();
    }

    getSubject(): OnClickSubject {
        if (!this.subject) throw new Error("subject is not set!");
        return this.subject;
    }

    setSubject(subject: OnClickSubject) {
        this.subject = subject;
    }
}
