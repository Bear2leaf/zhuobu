import Manager from "./Manager.js";

export default class TimestepManager extends Manager<unknown> {
    private currentFrame: number = 0;
    private lastFrame: number = this.currentFrame;
    private lastFrameTime: number = 0;
    private fps: number = 0;
    reset() {
        this.currentFrame = 0;
        this.lastFrame = this.currentFrame;
        this.lastFrameTime = this.now();
        this.fps = 0;
    }
    now(): number {
        return this.getDevice().now();
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