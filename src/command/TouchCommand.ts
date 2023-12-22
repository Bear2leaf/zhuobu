import { WindowInfo, TouchInfo } from "../device/Device.js";
import { Command } from "./Command.js";

export default class TouchCommand implements Command {
    private touchInfo?: TouchInfo;
    private windowInfo?: WindowInfo;
    setTouchInfo(touchInfo?: TouchInfo) {
        this.touchInfo = touchInfo;
    }
    setWindowInfo(windowInfo?: WindowInfo) {
        this.windowInfo = windowInfo;
    }
    getPixelRatio(): number {
        if (!this.windowInfo) throw new Error("WindowInfo not set");
        return this.windowInfo.pixelRatio;
    }
    getX(): number {
        if (!this.touchInfo) throw new Error("TouchInfo not set");
        if (!this.windowInfo) throw new Error("WindowInfo not set");
        return this.touchInfo.x;
    }
    getY(): number {
        if (!this.touchInfo) throw new Error("TouchInfo not set");
        if (!this.windowInfo) throw new Error("WindowInfo not set");
        return (this.windowInfo.windowHeight - this.touchInfo.y);
    }
    execute(): void {
        throw new Error("Method not implemented.");
    }

}