import DemoSubject from "../subject/OnClickSubject.js";
import TRS from "../transform/TRS.js";
import Observer from "./Observer.js";

export default class OnClickToggleScale extends Observer {
    private subject?: DemoSubject;
    private scale: number = 1;

    init(): void {
        
        console.debug("OnClickToggleScale", "is inited!");
    }

    public notify(): void {
        if (this.scale === 1) {
            this.scale = 2;
        } else {
            this.scale = 1;
        }
        this.getEntity().get(TRS).getScale().set(this.scale * 10, this.scale * 10, 1, 1);
    }

    getSubject(): DemoSubject {
        if (!this.subject) throw new Error("subject is not set!");
        return this.subject;
    }

    setSubject(subject: DemoSubject) {
        this.subject = subject;
    }
}
