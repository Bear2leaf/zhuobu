import Device from "../device/Device.js";

export abstract class Input {
    private device?: Device;
    abstract init(): void;
    getDevice() {
        if (!this.device) throw new Error("Device not set");
        return this.device;
    }
    setDevice(device: Device) {
        this.device = device;
    }
}