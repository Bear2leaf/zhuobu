import Device from "../device/Device.js";
import Game from "../game/Game.js";
import Manager from "./Manager";

export default class TimestepManager implements Manager {
    private currentFrame: number;
    private lastFrame: number;
    private lastFrameTime: number;
    private fps: number;
    private readonly device: Device = this.game.getDevice();
    constructor(private readonly game: Game) {
        this.currentFrame = 0;
        this.lastFrame = this.currentFrame;
        this.lastFrameTime = this.now();
        this.fps = 0;
    }
    load(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    init(): void {
        throw new Error("Method not implemented.");
    }
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