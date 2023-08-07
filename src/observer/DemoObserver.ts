import DemoSubject from "../subject/DemoSubject.js";
import Observer from "./Observer.js";

export default class DemoObserver extends Observer {
    private name: string = "demo observer";
    private state: number = 0;
    private subject?: DemoSubject;

    init(): void {
        
        console.log("ConcreteObserver", this.name, "is inited!");
    }

    public notify(): void {
        console.log("ConcreteObserver's notify method");
        console.log(this.name, this.state);
        this.state = this.getSubject().getSubjectState();
    }

    getSubject(): DemoSubject {
        if (!this.subject) throw new Error("subject is not set!");
        return this.subject;
    }

    setSubject(subject: DemoSubject) {
        this.subject = subject;
    }
}
