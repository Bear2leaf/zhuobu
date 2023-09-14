import SinAnimation from "../component/SinAnimation.js";
import DemoSubject from "../subject/OnClickSubject.js";
import Observer from "./Observer.js";

export default class OnClickToggleAnim extends Observer {
    private subject?: DemoSubject;

    init(): void {
        
        console.debug("OnClickToggleAnim", "is inited!");
    }

    public notify(): void {
        this.getEntity().get(SinAnimation).toggle();
    }

    getSubject(): DemoSubject {
        if (!this.subject) throw new Error("subject is not set!");
        return this.subject;
    }

    setSubject(subject: DemoSubject) {
        this.subject = subject;
    }
}
