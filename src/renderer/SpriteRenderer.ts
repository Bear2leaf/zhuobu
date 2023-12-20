import CameraManager from "../manager/CameraManager.js";
import Renderer from "./Renderer.js";

export default class SpriteRenderer extends Renderer {
    initCamera(cameraManager: CameraManager): void {
        this.setCamera(cameraManager.getFrontgroundCamera());
    }
}