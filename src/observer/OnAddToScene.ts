import OnAddToSceneSubject from "../subject/OnAddToSceneSubject.js";
import Observer from "./Observer.js";

export default class OnAddToScene extends Observer {
    private subject?: OnAddToSceneSubject;

    init(): void {
        console.debug("OnAddToScene", "is inited!");
        this.getSubject().register(this);
    }

    public notify(): void {
        console.log("OnAddToScene", "notify", this.getSubject().getEntity());
    }

    getSubject(): OnAddToSceneSubject {
        if (!this.subject) throw new Error("subject is not set!");
        return this.subject;
    }

    setSubject(subject: OnAddToSceneSubject) {
        this.subject = subject;
    }
}
