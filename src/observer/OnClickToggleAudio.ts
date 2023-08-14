import DemoAudio from "../audio/DemoAudio.js";
import DemoSubject from "../subject/OnClickSubject.js";
import Observer from "./Observer.js";

export default class OnClickToggleAudio extends Observer {
    private subject?: DemoSubject;

    init(): void {
        
        console.log("OnClickToggleAudio", "is inited!");
    }

    public notify(): void {
        // this.getEntity().get(DemoAudio).togglePlay();
    }

    getSubject(): DemoSubject {
        if (!this.subject) throw new Error("subject is not set!");
        return this.subject;
    }

    setSubject(subject: DemoSubject) {
        this.subject = subject;
    }
}
