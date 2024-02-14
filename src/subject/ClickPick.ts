import PickFrameBufferObject from "../framebuffer/PickFrameBufferObject.js";
import Observer from "../observer/Observer.js";
import OnClickPick from "../observer/OnClickPick.js";
import UIScene from "../scene/UIScene.js";
import InputSubject from "./InputSubject.js";

export default class ClickPick extends InputSubject {
    private frameBufferObject?: PickFrameBufferObject;
    private uiScene?: UIScene;
    setUIScene(uiScene: UIScene) {
        this.uiScene = uiScene;
    }
    getUIScene() {
        if (!this.uiScene) throw new Error("uiScene is not set!");
        return this.uiScene;
    }
    getFrameBufferObject() {
        if (!this.frameBufferObject) throw new Error("frameBufferObject is not set!");
        return this.frameBufferObject;
    }
    setFrameBufferObject(frameBufferObject: PickFrameBufferObject) {
        this.frameBufferObject = frameBufferObject;
    }
    private readonly observers: (OnClickPick)[] = [];
    public register(observer: Observer): void {
        if (observer instanceof OnClickPick) {
            this.observers.push(observer);
        } else {
            throw new Error("Not support observer");
        }
        super.register(observer);
    }
    public notify(): void {
        this.observers.forEach(observer => {
            if (observer instanceof OnClickPick) {
                observer.x = this.getScreenX();
                observer.y = this.getScreenY();
                observer.uiScene = this.getUIScene();
                observer.framebufferObject = this.getFrameBufferObject();
            } else {
                throw new Error("Not support observer");
            }
        })
        super.notify();
    }
}
