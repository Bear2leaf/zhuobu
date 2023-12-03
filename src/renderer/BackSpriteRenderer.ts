import { BackgroundCamera } from "../camera/BackgroundCamera.js";
import CameraManager from "../manager/CameraManager.js";
import Flowers from "../sprite/Flowers.js";
import Renderer from "./Renderer.js";

export default class BackSpriteRenderer extends Renderer {
    initCamera(cameraManager: CameraManager): void {
        this.setCamera(cameraManager.get(BackgroundCamera));
    }
    render(): void {
        this.prepareShader();
        this.prepareCamera();
        this.getSceneManager().first().getComponents(Flowers).forEach(drawObject => {
            this.drawEntity(drawObject);
        });
    }
}