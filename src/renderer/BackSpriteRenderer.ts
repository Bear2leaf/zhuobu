import CameraManager from "../manager/CameraManager.js";
import Renderer from "./Renderer.js";

export default class BackSpriteRenderer extends Renderer {
    initCamera(cameraManager: CameraManager): void {
        this.setCamera(cameraManager.getBackgroundCamera());
    }
}