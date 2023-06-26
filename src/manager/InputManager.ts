import Device, { TouchInfoFunction } from "../device/Device.js";
import Game from "../game/Game.js";
import Manager from "./Manager.js";

export default class InputManager implements Manager {
    private readonly device: Device = this.game.getDevice();
    constructor(private readonly game: Game) {
    }
    load(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    init(): void {
        throw new Error("Method not implemented.");
    }
    tick(): void {
        throw new Error("Method not implemented.");
    }
    onTouchStart(listener: TouchInfoFunction): void { this.device.onTouchStart(listener) };
    onTouchMove(listener: TouchInfoFunction): void { this.device.onTouchMove(listener) };
    onTouchEnd(listener: TouchInfoFunction): void { this.device.onTouchEnd(listener) };
    onTouchCancel(listener: TouchInfoFunction): void { this.device.onTouchCancel(listener) };
}