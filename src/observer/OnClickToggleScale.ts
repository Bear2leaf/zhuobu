import TRS from "../component/TRS.js";
import OnClickSubject from "../subject/OnClickSubject.js";
import Observer from "./Observer.js";

export default class OnClickToggleScale extends Observer {
    private subject?: OnClickSubject;
    private scale: number = 1;

    init(): void {
        
        console.log("OnClickToggleScale", "is inited!");
    }

    public notify(): void {
        if (this.scale === 1) {
            this.scale = 2;
        } else {
            this.scale = 1;
        }
        this.getEntity().get(TRS).getScale().set(this.scale * 10, this.scale * 10, 1, 1);
    }

    getSubject(): OnClickSubject {
        if (!this.subject) throw new Error("subject is not set!");
        return this.subject;
    }

    setSubject(subject: OnClickSubject) {
        this.subject = subject;
    }
}
