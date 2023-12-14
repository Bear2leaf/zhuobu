import AdrElementSubject from "../subject/AdrElementSubject.js";
import Node from "../transform/Node.js";
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
            element.traverseChildren(child => {
                this.getAdrManager().getSceneManager().getAdrNotificationScene().removeEntity(child.getEntity());
            });
        } else if (element.getAttribute("id") === "event" || element.isDescendantOfById("event")) {
            this.getAdrManager().getSceneManager().getAdrEventScene().removeEntity(element.getEntity());
            element.traverseChildren(child => {
                this.getAdrManager().getSceneManager().getAdrEventScene().removeEntity(child.getEntity());
            });
        } else if (element.getAttribute("id") === "content" || element.isDescendantOfById("content")) {
            this.getAdrManager().getSceneManager().getAdrScene().removeEntity(element.getEntity());

            element.traverseChildren(child => {
                this.getAdrManager().getSceneManager().getAdrScene().removeEntity(child.getEntity());
            });
        } else {
            this.getAdrManager().getSceneManager().getTmpScene().removeEntity(element.getEntity());
            element.traverseChildren(child => {
                this.getAdrManager().getSceneManager().getTmpScene().removeEntity(child.getEntity());
            });
        }
        element.getEntity().get(Node).setParent();
        element.getDomElement().remove();
        element.parentNode = undefined;
    }

}
