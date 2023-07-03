import Camera from "../camera/Camera.js";
import { OrthoCamera } from "../camera/OrthoCamera.js";
import { PerspectiveCamera } from "../camera/PerspectiveCamera.js";
import Manager from "./Manager.js";

export default class CameraManager extends Manager<Camera> {
    init(): void {
        const deviceInfo =this.getDevice().getDeviceInfo();
        [
            OrthoCamera,
            PerspectiveCamera
        ].forEach((ctor) => {
            this.add<Camera>(ctor);
            this.get<Camera>(ctor).setSize(deviceInfo.windowWidth, deviceInfo.windowHeight);
            this.get<Camera>(ctor).init();
        });
    }
    update(): void {
    }
}