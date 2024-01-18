import Hamburger from "../layout/Hamburger.js";
import UILayout from "../subject/UILayout.js";
import Node from "../transform/Node.js";
import Observer from "./Observer.js";

export default class OnUILayout extends Observer {
    getSubject(): UILayout {
        const subject = super.getSubject();
        if (!(subject instanceof UILayout)) throw new Error("subject is not UILayout!");
        return subject;
    }
    public notify(): void {
        const uiScene = this.getSubject().getUIScene();
        const hamburger = uiScene.getHamburgerObject().get(Hamburger);
        hamburger.setStatus(uiScene.getMessageObject().get(Node));
        hamburger.setInfo(uiScene.getInformationObject().get(Node));
        hamburger.setExplore(uiScene.getExploreButtonObject().get(Node));
        hamburger.setRest(uiScene.getRestButtonObject().get(Node));
        hamburger.layout();
    }

}
