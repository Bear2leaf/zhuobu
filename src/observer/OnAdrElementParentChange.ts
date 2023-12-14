import AdrElementSubject from "../subject/AdrElementSubject.js";
import AdrElementObserver from "./AdrElementObserver.js";

export default class OnAdrElementParentChange extends AdrElementObserver {

    getSubject(): AdrElementSubject {
        const subject = super.getSubject();
        if (subject instanceof AdrElementSubject) {
            return subject;
        } else {
            throw new Error("subject is not AdrElementSubject!");
        }
    }

    public notify(): void {
        const adrElement = this.getSubject().getElement();
        if (adrElement.isDescendantOfById("notifications")) {
            this.getAdrManager().getSceneManager().getTmpScene().removeEntity(adrElement.getEntity());
            this.getAdrManager().getSceneManager().getAdrNotificationScene().addEntity(adrElement.getEntity());
            adrElement.traverseChildren(child => {
                this.getAdrManager().getSceneManager().getTmpScene().removeEntity(child.getEntity());
                this.getAdrManager().getSceneManager().getAdrNotificationScene().addEntity(child.getEntity());
            });
        } else if (adrElement.isDescendantOfById("event")) {
            this.getAdrManager().getSceneManager().getTmpScene().removeEntity(adrElement.getEntity());
            this.getAdrManager().getSceneManager().getAdrEventScene().addEntity(adrElement.getEntity());
            adrElement.traverseChildren(child => {
                this.getAdrManager().getSceneManager().getTmpScene().removeEntity(child.getEntity());
                this.getAdrManager().getSceneManager().getAdrEventScene().addEntity(child.getEntity());
            });
        } else if (adrElement.isDescendantOfById("content")) {
            this.getAdrManager().getSceneManager().getTmpScene().removeEntity(adrElement.getEntity());
            this.getAdrManager().getSceneManager().getAdrScene().addEntity(adrElement.getEntity());
            adrElement.traverseChildren(child => {
                this.getAdrManager().getSceneManager().getTmpScene().removeEntity(child.getEntity());
                this.getAdrManager().getSceneManager().getAdrScene().addEntity(child.getEntity());
            });
        }
    }

}
