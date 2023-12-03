import CircleAnimator from "../animator/CircleAnimator.js";
import OnClickSubject from "../subject/OnClickSubject.js";
import Observer from "./Observer.js";

export default class OnClickToggleAnim extends Observer {
    private subject?: OnClickSubject;

    init(): void {
        
        console.debug("OnClickToggleAnim", "is inited!");
    }

    public notify(): void {
        this.getEntity().get(CircleAnimator).toggle();
    }

    getSubject(): OnClickSubject {
        if (!this.subject) throw new Error("subject is not set!");
        return this.subject;
    }

    setSubject(subject: OnClickSubject) {
        this.subject = subject;
    }
}
