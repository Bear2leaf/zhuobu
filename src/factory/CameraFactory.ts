import { OrthoCamera } from "../camera/OrthoCamera.js";
import { PerspectiveCamera } from "../camera/PerspectiveCamera.js";
import Factory from "./Factory.js";

export default class CameraFactory implements Factory {
    createMainCamera(width: number, height: number) {
        const fov = Math.PI / 180 * 60;
        const aspect = width / height;
        return new PerspectiveCamera(fov, aspect, 1, 50);
    }
    createDebugCamera(width: number, height: number) {
        const fov = Math.PI / 180 * 90;
        const aspect = width / height;
        return new PerspectiveCamera(fov, aspect, 1, 500);
    }
    createOrthoCamera(width: number, height: number) {
        return  new OrthoCamera(0, width, height, 0, 1, -1);
    }
}