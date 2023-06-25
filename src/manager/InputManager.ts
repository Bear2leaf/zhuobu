import Device, { TouchInfoFunction } from "../device/Device.js";
import Manager from "./Manager.js";

export default class InputManager implements Manager {
    constructor(private readonly device: Device) {
    }
    onTouchStart(listener: TouchInfoFunction): void { this.device.onTouchStart(listener) };
    onTouchMove(listener: TouchInfoFunction): void { this.device.onTouchMove(listener) };
    onTouchEnd(listener: TouchInfoFunction): void { this.device.onTouchEnd(listener) };
    onTouchCancel(listener: TouchInfoFunction): void { this.device.onTouchCancel(listener) };
}