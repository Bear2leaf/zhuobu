import GLContainer from "../component/GLContainer.js";
import TouchEventContainer from "../component/TouchEventContainer.js";
import { Vec3 } from "../math/Vector.js";
import OnClickSubject from "../subject/OnClickSubject.js";
import Observer from "./Observer.js";

export default class OnPickSayHelloPick extends Observer {
    private subject?: OnClickSubject;
    private readonly color: Vec3 = new Vec3(1, 0, 0);

    init(): void {
        console.log("OnClickSayHelloPick", "is inited!");
    }

    public notify(): void {
        console.log("Hello Pick!");

    }

    getSubject(): OnClickSubject {
        if (!this.subject) throw new Error("subject is not set!");
        return this.subject;
    }

    setSubject(subject: OnClickSubject) {
        this.subject = subject;
    }
}
