import UIScene from "../scene/UIScene.js";
import Subject from "./Subject.js";

export default class UILayout extends Subject {

    private uiScene?: UIScene;
    setUIScene(uiScene: UIScene) {
        this.uiScene = uiScene;
    }
    getUIScene(): UIScene {
        if (!this.uiScene) throw new Error("uiScene is not set!");
        return this.uiScene;
    }
}
