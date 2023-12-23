import AdrElementSubject from "../subject/AdrElementSubject.js";
import TRS from "../transform/TRS.js";
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
            this.getAdrManager().getSceneManager().getTmpScene().removeEntity(adrElement.getEntity());
            this.getAdrManager().getSceneManager().getAdrNotificationScene().addEntity(adrElement.getEntity());
            adrElement.getEntity().get(TRS).getPosition().x = -400;
            adrElement.getEntity().get(TRS).getPosition().y = 100;
            adrElement.getEntity().get(TRS).getPosition().z = -1;
        } else if (id === 'event') {
            this.getAdrManager().getSceneManager().getTmpScene().removeEntity(adrElement.getEntity());
            this.getAdrManager().getSceneManager().getAdrEventScene().addEntity(adrElement.getEntity());
            adrElement.getEntity().get(TRS).getPosition().x = -400;
            adrElement.getEntity().get(TRS).getPosition().y = -200;
            adrElement.getEntity().get(TRS).getPosition().z = -1;
        } else if (id === 'content') {
            this.getAdrManager().getSceneManager().getTmpScene().removeEntity(adrElement.getEntity());
            this.getAdrManager().getSceneManager().getAdrScene().addEntity(adrElement.getEntity());
            adrElement.getEntity().get(TRS).getPosition().y = 200;
            adrElement.getEntity().get(TRS).getPosition().x = 0;
            adrElement.getEntity().get(TRS).getPosition().z = -1;
        }
    }

}
