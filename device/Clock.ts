import Device from "./Device";

export default class Clock {
    private readonly device: Device;
    private currentFrame: number;
    private lastFrame: number;
    private lastFrameTime: number;
    private fps: number;
    constructor(device: Device) {
        this.device = device;
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