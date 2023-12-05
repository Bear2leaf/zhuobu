import Device, { ViewPortType } from "../device/Device.js";
import EntitySubject from "../subject/EntitySubject.js";
import Observer from "./Observer.js";

export default class OnViewPortChange extends Observer {
    private device?: Device;
    getSubject(): EntitySubject {
        const subject = super.getSubject();
        if (subject instanceof EntitySubject) {
            return subject;
        } else {
            throw new Error("subject is not EntitySubject!");
        }
    }

    setDevice(device: Device) {
        this.device = device;
    }
    getDevice(): Device {
        if (this.device) {
            return this.device;
        } else {
            throw new Error("Device not set!");
        }
    }
    public notify(): void {
        this.getDevice().viewportTo(ViewPortType.Full)
    }

}
