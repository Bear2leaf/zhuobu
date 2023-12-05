import Device from "../device/Device.js";
import GLTexture from "./GLTexture.js";

export default class DefaultTexture extends GLTexture {
    setDevice(device: Device): void {
        super.setDevice(device);
        this.generate(2, 2, new Float32Array([1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1]));
    }

}