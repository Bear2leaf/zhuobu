import { OrthoCamera } from "../camera/OrthoCamera.js";
import { PerspectiveCamera } from "../camera/PerspectiveCamera.js";

export default class CameraFactory {
    private readonly width: number;
    private readonly height: number;
    private mainCamera?: PerspectiveCamera;
    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
    }
    createMainCamera() {
        const fov = Math.PI / 180 * 60;
        const aspect = this.width / this.height;
        return new PerspectiveCamera(fov, aspect, 1, 50);
    }
    createDebugCamera() {
        const fov = Math.PI / 180 * 90;
        const aspect = this.width / this.height;
        return new PerspectiveCamera(fov, aspect, 1, 500);
    }
    createOrthoCamera() {
        return  new OrthoCamera(0, this.width, this.height, 0, 1, -1);;
    }
    createUICamera() {
        return this.createOrthoCamera();
    }
}