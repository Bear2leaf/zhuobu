import PickFrameBufferObject from "../framebuffer/PickFrameBufferObject.js";
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
}
