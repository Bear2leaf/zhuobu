import DemoSubject from "../subject/DemoSubject.js";
import Observer from "./Observer.js";

export default class DemoObserver extends Observer {
    private subject?: DemoSubject;

    init(): void {
        
        console.log("DemoObserver", "is inited!");
    }

    public notify(): void {
        console.log("DemoObserver's notify method");
    }

    getSubject(): DemoSubject {
        if (!this.subject) throw new Error("subject is not set!");
        return this.subject;
    }

    setSubject(subject: DemoSubject) {
        this.subject = subject;
    }
}
