import { UICamera } from "../camera/UICamera.js";
import Pointer from "../drawobject/Pointer.js";
import CameraManager from "../manager/CameraManager.js";
import Renderer from "./Renderer.js"
export class PointRenderer extends Renderer {
    initCamera(cameraManager: CameraManager): void {
        this.setCamera(cameraManager.get(UICamera));
    }
    render(): void {

        this.prepareShader();
        this.prepareCamera();
        this.getSceneManager().first().getComponents(Pointer).forEach(drawObject => {
            this.drawEntity(drawObject);
        });
    }
}