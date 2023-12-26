import { MainCamera } from "../camera/MainCamera.js";
import AnimationController from "./AnimationController.js";

export default class CameraController extends AnimationController {
    private camera?: MainCamera;
    setCamera(camera: MainCamera) {
        this.camera = camera;
    }
    updateCamera(timeScale: number) {
        if (!this.camera) {
            throw new Error("camera not set");
        }
        // this.camera.rotateViewPerFrame(this.getDelta() * timeScale);
    }

}