import Device from "../device/Device.js";
import Manager from "./Manager";

export default class TimestepManager extends Manager<unknown> {
    private readonly device: Device = this.game.getDevice();
    private currentFrame: number = 0;
    private lastFrame: number = this.currentFrame;
    private lastFrameTime: number = this.now();
    private fps: number = 0;
    reset() {
        this.currentFrame = 0;
        this.lastFrame = this.currentFrame;
        this.lastFrameTime = this.now();
        this.fps = 0;
    }
    now(): number {
        return this.device.now();
    }
    getFrames(): number {
        return this.currentFrame;
    }
    getDelta(): number {
        return this.currentFrame - this.lastFrame;
    }
    getFPS(): number {
        return this.fps;
    }
    tick(): void {
        this.currentFrame++;
        if (this.now() - this.lastFrameTime >= 1000) {
            this.fps = this.currentFrame - this.lastFrame;
            this.lastFrameTime = this.now();
            this.lastFrame = this.currentFrame;
        }

    }
}