import Touch from "../input/Touch.js";
import Device from "../device/Device.js";

export default class InputManager {
    private readonly touch = new Touch();
    initInput(device: Device): void {
            this.touch.setDevice(device);
            this.touch.init();
    }
    process(): void {
            this.touch.process();
    }
}