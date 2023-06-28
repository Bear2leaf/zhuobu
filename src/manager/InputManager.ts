import Device, { TouchInfoFunction } from "../device/Device.js";
import Manager from "./Manager.js";

export default class InputManager extends Manager<unknown> {
    private readonly device: Device = this.game.getDevice();
    onTouchStart(listener: TouchInfoFunction): void { this.device.onTouchStart(listener) };
    onTouchMove(listener: TouchInfoFunction): void { this.device.onTouchMove(listener) };
    onTouchEnd(listener: TouchInfoFunction): void { this.device.onTouchEnd(listener) };
    onTouchCancel(listener: TouchInfoFunction): void { this.device.onTouchCancel(listener) };
}