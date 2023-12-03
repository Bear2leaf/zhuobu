import BaseTouchSubject from "../subject/BaseTouchSubject.js";
import Observer from "./Observer.js";

export default class DemoObserver extends Observer {
    private subject?: BaseTouchSubject;

    init(): void {
        
        console.debug("DemoObserver", "is inited!");
    }

    public notify(): void {
        console.debug("DemoObserver's notify method");
    }

    getSubject(): BaseTouchSubject {
        if (!this.subject) throw new Error("subject is not set!");
        return this.subject;
    }

    setSubject(subject: BaseTouchSubject) {
        this.subject = subject;
    }
}
