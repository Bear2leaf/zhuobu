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
    getX(): number {
        if (!this.touchInfo) throw new Error("TouchInfo not set");
        if (!this.windowInfo) throw new Error("WindowInfo not set");
        return this.touchInfo.x * (this.windowInfo?.pixelRatio || 1);
    }
    getY(): number {
        if (!this.touchInfo) throw new Error("TouchInfo not set");
        if (!this.windowInfo) throw new Error("WindowInfo not set");
        return (this.windowInfo.windowHeight - this.touchInfo.y) * (this.windowInfo?.pixelRatio || 1);
    }
    execute(): void {
        throw new Error("Method not implemented.");
    }

}