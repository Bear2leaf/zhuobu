import { FrontgroundCamera } from "../camera/FrontgroundCamera.js";
import CameraManager from "../manager/CameraManager.js";
import DefaultSprite from "../sprite/DefaultSprite.js";
import Renderer from "./Renderer.js";

export default class SpriteRenderer extends Renderer {
    initCamera(cameraManager: CameraManager): void {
        this.setCamera(cameraManager.getFrontgroundCamera());
    }
    render(): void {
        this.prepareShader();
        this.prepareCamera();
        // this.getSceneManager().first().getComponents(DefaultSprite).forEach(drawObject => {
        //     this.drawEntity(drawObject);
        // });
    }
}