import CameraManager from "../manager/CameraManager.js";
import Flowers from "../sprite/Flowers.js";
import Renderer from "./Renderer.js";

export default class BackSpriteRenderer extends Renderer {
    initCamera(cameraManager: CameraManager): void {
        this.setCamera(cameraManager.getBackgroundCamera());
    }
    render(): void {
        this.prepareShader();
        this.prepareCamera();
        this.getSceneManager().first().getComponents(Flowers).forEach(drawObject => {
            this.drawEntity(drawObject);
        });
    }
}