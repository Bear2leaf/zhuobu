import TimestepManager from "../manager/TimestepManager.js";
import Modifier from "./Modifier.js";

export default class TimestepModifier implements Modifier {
    private timestepManager?: TimestepManager;
    private info = "";
    private updateTimestepInfo() {
        this.info = `Fps: ${this.getTimestepManager().getFPS()}, Frames: ${this.getTimestepManager().getFrames()}, Delta: ${this.getTimestepManager().getDeltaTime()}`;
    }
    update(): void {
        this.updateTimestepInfo();
    }
    getTimestepInfo() {
        return this.info;
    }
    getTimestepManager(): TimestepManager {
        if (this.timestepManager === undefined) {
            throw new Error("timestepManager is undefined");
        }
        return this.timestepManager;
    }
    setTimestepManager(timestepManager: TimestepManager) {
        this.timestepManager = timestepManager;
    }
    
}