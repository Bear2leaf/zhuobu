import SceneManager from "../manager/SceneManager.js";
import Observer from "../observer/Observer.js";

export default abstract class Subject {
    private listeners: Observer[] = [];
    private sceneManager?: SceneManager;
    public setSceneManager(sceneManager: SceneManager): void {
        this.sceneManager = sceneManager;
    }
    public getSceneManager(): SceneManager {
        if (this.sceneManager === undefined) {
            throw new Error("sceneManager is undefined");
        }
        return this.sceneManager;
    }
    public register(observer: Observer): void {
        console.debug(observer, "is pushed!");
        this.listeners.push(observer);
    }

    public unregister(observer: Observer): void {
        var n: number = this.listeners.indexOf(observer);
        console.debug(observer, "is removed");
        this.listeners.splice(n, 1);
    }

    public notify(): void {
        console.debug("notify all the observers", this.listeners);
        var i: number
          , max: number;

        for (i = 0, max = this.listeners.length; i < max; i += 1) {
            this.listeners[i].notify();
        }
    }
}