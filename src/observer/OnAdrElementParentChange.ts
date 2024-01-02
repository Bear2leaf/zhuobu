import AdrElementSubject from "../subject/AdrElementSubject.js";
import TRS from "../transform/TRS.js";
import AdrElementObserver from "./AdrElementObserver.js";

export default class OnAdrElementParentChange extends AdrElementObserver {

    private notificationCounter = 0;
    private eventCounter = 0;
    private contentCounter = 0;
    private readonly height = 24;

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
        // if (adrElement.isDescendantOfById("notifications")) {
        //     this.getAdrManager().getSceneManager().getTmpScene().removeEntity(adrElement.getEntity());
        //     this.getAdrManager().getSceneManager().getAdrNotificationScene().addEntity(adrElement.getEntity());
        //     adrElement.getEntity().get(TRS).getPosition().y = this.notificationCounter++ * this.height;
        //     adrElement.traverseChildren(child => {
        //         this.getAdrManager().getSceneManager().getTmpScene().removeEntity(child.getEntity());
        //         this.getAdrManager().getSceneManager().getAdrNotificationScene().addEntity(child.getEntity());
        //         child.getEntity().get(TRS).getPosition().y = this.notificationCounter++ * this.height;
        //     });
        // } else if (adrElement.isDescendantOfById("event")) {
        //     this.getAdrManager().getSceneManager().getTmpScene().removeEntity(adrElement.getEntity());
        //     this.getAdrManager().getSceneManager().getAdrEventScene().addEntity(adrElement.getEntity());
        //     adrElement.getEntity().get(TRS).getPosition().y = this.eventCounter++ * this.height / 2;
        //     adrElement.traverseChildren(child => {
        //         this.getAdrManager().getSceneManager().getTmpScene().removeEntity(child.getEntity());
        //         this.getAdrManager().getSceneManager().getAdrEventScene().addEntity(child.getEntity());
        //         child.getEntity().get(TRS).getPosition().y = this.eventCounter++ * this.height / 2;
        //     });
        // } else if (adrElement.isDescendantOfById("content")) {
        //     this.getAdrManager().getSceneManager().getTmpScene().removeEntity(adrElement.getEntity());
        //     this.getAdrManager().getSceneManager().getAdrScene().addEntity(adrElement.getEntity());
        //     adrElement.getEntity().get(TRS).getPosition().y = this.contentCounter++ * -this.height;
        //     adrElement.traverseChildren(child => {
        //         this.getAdrManager().getSceneManager().getTmpScene().removeEntity(child.getEntity());
        //         this.getAdrManager().getSceneManager().getAdrScene().addEntity(child.getEntity());
        //         child.getEntity().get(TRS).getPosition().y = this.contentCounter++ * -this.height;
        //     });
        // }
    }

}
