import { ViewPortType } from "../device/Device.js";
import Scene from "../scene/Scene.js";
import Manager from "./Manager.js";

export default class RendererManager extends Manager<unknown> {
    private scene?: Scene;
    init(): void {
        console.log("RendererManager init");
    }
    update(): void {
        this.getDevice().viewportTo(ViewPortType.Full);
        // this.getScene().render();
    }
    setScene(scene: Scene): void {
        this.scene = scene;
    }
    getScene(): Scene {
        if (this.scene === undefined) {
            throw new Error("scene is undefined");
        }
        return this.scene;
    }
}