import EntityInit from "../subject/EntityInit.js";
import Observer from "./Observer.js";

export default class OnEntityInit extends Observer {

    getSubject(): EntityInit {
        const subject = super.getSubject();
        if (subject instanceof EntityInit) {
            return subject;
        } else {
            throw new Error("subject is not EntityInit!");
        }
    }

    public notify(): void {
        console.log("OnEntityInit", this.getSubject().getEntity());
    }

}
