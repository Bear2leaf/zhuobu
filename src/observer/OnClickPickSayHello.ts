
import { Vec2, Vec3 } from "../math/Vector.js";
import GLContainer from "../component/GLContainer.js";
import Observer from "./Observer.js";
import DemoSubject from "../subject/DemoSubject.js";
import Mesh from "../drawobject/Mesh.js";

export default class OnClickPickSayHello extends Observer {
    private subject?: DemoSubject;
    public notify(): void {
        console.log("Hello Pick! " + this.getEntity().get(Mesh).getGLTF().getName())
    }
    getSubject(): DemoSubject {
        if (!this.subject) throw new Error("subject is not set!");
        return this.subject;
    }

    setSubject(subject: DemoSubject) {
        this.subject = subject;
    }

}