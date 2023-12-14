import AdrElementSubject from "../subject/AdrElementSubject.js";
import AdrElementObserver from "./AdrElementObserver.js";

export default class OnAdrElementRemove extends AdrElementObserver {

    getSubject(): AdrElementSubject {
        const subject = super.getSubject();
        if (subject instanceof AdrElementSubject) {
            return subject;
        } else {
            throw new Error("subject is not AdrElementSubject!");
        }
    }

    public notify(): void {
        const element = this.getSubject().getElement();
        if (element.getAttribute("id") === "notifications" || element.isDescendantOfById("notifications")) {
            this.getAdrManager().getSceneManager().getAdrNotificationScene().removeEntity(element.getEntity());
        } else if (element.getAttribute("id") === "event" || element.isDescendantOfById("event")) {
            this.getAdrManager().getSceneManager().getAdrEventScene().removeEntity(element.getEntity());
        } else {
            this.getAdrManager().getSceneManager().getAdrScene().removeEntity(element.getEntity());
        }
    }

}
