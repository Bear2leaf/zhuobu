import MoveCircleController from "../controller/MoveCircleController.js";
import OnClickSubject from "../subject/OnClickSubject.js";
import Observer from "./Observer.js";

export default class OnClickToggleAnim  extends Observer {
    private subject?: OnClickSubject;

    init(): void {
        console.debug("OnClickToggleAnim", "is inited!");
        this.getSubject().register(this);
    }

    public notify(): void {
        // this.getEntity().get(MoveCircleController).toggle();
    }

    getSubject(): OnClickSubject {
        if (!this.subject) throw new Error("subject is not set!");
        return this.subject;
    }

    setSubject(subject: OnClickSubject) {
        this.subject = subject;
    }
}
