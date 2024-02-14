import Device, { ViewPortType } from "../device/Device.js";
import Observer from "./Observer.js";

export default class OnViewPortChange extends Observer {
    device?: Device;
    public notify(): void {
        this.device!.viewportTo(ViewPortType.Full)
    }

}
