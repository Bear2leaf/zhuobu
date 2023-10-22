import FpsText from "../drawobject/FpsText.js";
import FramesText from "../drawobject/FramesText.js";
import Histogram from "../drawobject/Histogram.js";
import Scene from "../scene/Scene.js";
import Manager from "./Manager.js";
import SceneManager from "./SceneManager.js";

export default class TimestepManager extends Manager<Object> {
    private sceneManager?: SceneManager;
    private frames: number = 0;
    private currentFrameTime: number = 0;
    private lastFrameTime: number = 0;
    private deltaTime: number = 0;
    private fps: number = 0;
    addObjects(): void {
    }
    async load(): Promise<void> {

    }
    init(): void {

    }
    now(): number {
        return this.getDevice().now();
    }
    getFrames(): number {
        return this.frames;
    }
    getDeltaTime(): number {
        return this.deltaTime;
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
        this.frames++;
        this.currentFrameTime = this.now();
        this.deltaTime = this.currentFrameTime - this.lastFrameTime;
        this.fps = 1000 / this.deltaTime;
        this.lastFrameTime = this.currentFrameTime;
        this.getScene().getComponents(Histogram).forEach(histogram => histogram.updateHistogram(this.getFPS()));
        this.getScene().getComponents(FpsText).forEach(text => text.updateChars(`FPS: ${this.getFPS()}`));
        this.getScene().getComponents(FramesText).forEach(text => text.updateChars(`Frames: ${this.getFrames()}\nDeltaTime: ${this.deltaTime}`));
    }

}