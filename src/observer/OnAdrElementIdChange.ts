import AdrElementSubject from "../subject/AdrElementSubject.js";
import AdrElementObserver from "./AdrElementObserver.js";

export default class OnAdrElementIdChange extends AdrElementObserver {

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
        const id = adrElement.getAttribute("id");
        if (id === 'notifications') {
            this.getAdrManager().getSceneManager().getAdrScene().removeEntity(adrElement.getEntity());
            this.getAdrManager().getSceneManager().getAdrNotificationScene().addEntity(adrElement.getEntity());
        } else if (id === 'event') {
            this.getAdrManager().getSceneManager().getAdrScene().removeEntity(adrElement.getEntity());
            this.getAdrManager().getSceneManager().getAdrEventScene().addEntity(adrElement.getEntity());
        }
    }

}
