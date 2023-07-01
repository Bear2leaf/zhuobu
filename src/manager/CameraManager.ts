import Camera from "../camera/Camera.js";
import { OrthoCamera } from "../camera/OrthoCamera.js";
import { PerspectiveCamera } from "../camera/PerspectiveCamera.js";
import Manager from "./Manager.js";

export default class CameraManager extends Manager<Camera> {
    init(): void {
        [
            OrthoCamera,
            PerspectiveCamera
        ].forEach((ctor) => {
            this.add<Camera>(ctor);
        });
    }
    update(): void {
    }
}