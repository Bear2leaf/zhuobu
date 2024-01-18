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
        hamburger.setBottom(uiScene.getMessageObject().get(Node));
        hamburger.setTop(uiScene.getInformationObject().get(Node));
        hamburger.setContent1(uiScene.getExploreButtonObject().get(Node));
        hamburger.setContent2(uiScene.getRestButtonObject().get(Node));
        hamburger.layout();
    }

}
