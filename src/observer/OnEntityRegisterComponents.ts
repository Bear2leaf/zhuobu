import EntitySubject from "../subject/EntitySubject.js";
import Observer from "./Observer.js";

export default class OnEntityRegisterComponents extends Observer {

    getSubject(): EntitySubject {
        const subject = super.getSubject();
        if (subject instanceof EntitySubject) {
            return subject;
        } else {
            throw new Error("subject is not EntitySubject!");
        }
    }

    public notify(): void {
        // console.debug("OnEntityRegisterComponents", entity);
        const entity = this.getSubject().getEntity();
        entity.all().forEach((component) => {
            component.setEntity(entity);
        });

    }

}
