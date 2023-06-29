import { TouchInfoFunction } from "../device/Device.js";
import Manager from "./Manager.js";

export default class InputManager extends Manager<unknown> {
    onTouchStart(listener: TouchInfoFunction): void {
        this.getDevice().onTouchStart(listener)
    };
    onTouchMove(listener: TouchInfoFunction): void {
        this.getDevice().onTouchMove(listener)
    };
    onTouchEnd(listener: TouchInfoFunction): void {
        this.getDevice().onTouchEnd(listener)
    };
    onTouchCancel(listener: TouchInfoFunction): void {
        this.getDevice().onTouchCancel(listener)
    };
    init(): void {
        console.log("InputManager init");
    }
    update(): void {
    }
}