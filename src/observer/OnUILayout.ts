import Hamburger from "../layout/Hamburger.js";
import UIScene from "../scene/UIScene.js";
import Node from "../transform/Node.js";
import Observer from "./Observer.js";

export default class OnUILayout extends Observer {
    uiScene?: UIScene;
    public notify(): void {
        const uiScene = this.uiScene!;
        const hamburger = uiScene.getHamburgerObject().get(Hamburger);
        hamburger.setStatus(uiScene.getMessageObject().get(Node));
        hamburger.setInfo(uiScene.getInformationObject().get(Node));
        hamburger.setExplore(uiScene.getExploreButtonObject().get(Node));
        hamburger.setRest(uiScene.getRestButtonObject().get(Node));
        hamburger.layout();
    }

}
