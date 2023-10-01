import FpsText from "../drawobject/FpsText.js";
import FramesText from "../drawobject/FramesText.js";
import Histogram from "../drawobject/Histogram.js";
import Scene from "../scene/Scene.js";
import Manager from "./Manager.js";
import SceneManager from "./SceneManager.js";

export default class TimestepManager extends Manager<unknown> {
    private sceneManager?: SceneManager;
    private currentFrame: number = 0;
    private lastFrame: number = this.currentFrame;
    private lastFrameTime: number = 0;
    private fps: number = 0;
    addObjects(): void {
    }
    async load(): Promise<void> {

    }
    init(): void {
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
    getSceneManager(): SceneManager {
        if (this.sceneManager === undefined) {
            throw new Error("sceneManager is undefined");
        }
        return this.sceneManager;
    }
    setSceneManager(sceneManager: SceneManager) {
        this.sceneManager = sceneManager;
    }
    getScene(): Scene {
        return this.getSceneManager().first();
    }
    update(): void {
        this.currentFrame++;
        if (this.now() - this.lastFrameTime >= 1000) {
            this.fps = this.currentFrame - this.lastFrame;
            this.lastFrameTime = this.now();
            this.lastFrame = this.currentFrame;
            this.getScene().getComponents(Histogram).forEach(histogram => histogram.updateHistogram(this.getFPS()));
            this.getScene().getComponents(FpsText).forEach(text => text.updateChars(`FPS: ${this.getFPS()}`));
        }
        this.getScene().getComponents(FramesText).forEach(text => text.updateChars(`Frames: ${this.getFrames()}\nDelta: ${this.getDelta()}`));
    }

}