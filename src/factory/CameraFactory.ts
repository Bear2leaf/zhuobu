import { OrthoCamera } from "../camera/OrthoCamera.js";
import { PerspectiveCamera } from "../camera/PerspectiveCamera.js";
import FactoryManager from "../manager/FactoryManager.js";
import Factory from "./Factory.js";

export default class CameraFactory implements Factory {
    private readonly width = this.factoryManager.getWidth();
    private readonly height = this.factoryManager.getHeight();
    constructor(private readonly factoryManager: FactoryManager) {
        
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
        return new OrthoCamera(0, this.width, this.height, 0, 1, -1);
    }
}