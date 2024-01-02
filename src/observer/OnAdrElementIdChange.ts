import AdrContent from "../drawobject/AdrContent.js";
import AdrEvent from "../drawobject/AdrEvent.js";
import AdrNotification from "../drawobject/AdrNotification.js";
import AdrText from "../drawobject/AdrText.js";
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
        // const adrElement = this.getSubject().getElement();
        // const id = adrElement.getAttribute("id");
        // const entity = adrElement.getEntity();
        // const trs = entity.get(TRS);
        // const sceneManager = this.getAdrManager().getSceneManager();
        // if (id === 'notifications') {
        //     sceneManager.getTmpScene().removeEntity(entity);
        //     sceneManager.getAdrNotificationScene().addEntity(entity);
        //     trs.getPosition().x = -400;
        //     trs.getPosition().y = 100;
        //     trs.getPosition().z = -1;
        //     const comp = new AdrNotification();
        //     comp.setEntity(entity);
        //     entity.set(AdrText, comp);
        //     sceneManager.getAdrNotificationScene().initEntity(entity);
        // } else if (id === 'event') {
        //     sceneManager.getTmpScene().removeEntity(entity);
        //     sceneManager.getAdrEventScene().addEntity(entity);
        //     trs.getPosition().x = -400;
        //     trs.getPosition().y = -200;
        //     trs.getPosition().z = -1;
        //     const comp = new AdrEvent();
        //     comp.setEntity(entity);
        //     entity.set(AdrText, comp);
        //     sceneManager.getAdrEventScene().initEntity(entity);
        // } else if (id === 'content') {
        //     sceneManager.getAdrScene().addEntity(entity);
        //     trs.getPosition().y = 200;
        //     trs.getPosition().x = 0;
        //     trs.getPosition().z = -1;
        //     const comp = new AdrContent();
        //     comp.setEntity(entity);
        //     entity.set(AdrText, comp);
        //     sceneManager.getAdrScene().initEntity(entity);
        // }
    }

}
