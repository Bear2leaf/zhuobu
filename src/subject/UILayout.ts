import Observer from "../observer/Observer.js";
import OnUILayout from "../observer/OnUILayout.js";
import UIScene from "../scene/UIScene.js";
import Subject from "./Subject.js";

export default class UILayout extends Subject {

    private uiScene?: UIScene;
    private readonly observers: OnUILayout[] = [];
    public register(observer: Observer): void {
        if (observer instanceof OnUILayout) {
            this.observers.push(observer);
        } else {
            throw new Error("Not support observer");
        }
        super.register(observer);
    }
    setUIScene(uiScene: UIScene) {
        this.uiScene = uiScene;
    }
    getUIScene(): UIScene {
        if (!this.uiScene) throw new Error("uiScene is not set!");
        return this.uiScene;
    }
    public notify(): void {
        this.observers.forEach(observer => {
            observer.uiScene = this.getUIScene();
        })
        super.notify();
        this.observers.forEach(observer => {
            observer.uiScene = undefined;
        })
    }
}
