import SceneManager from "../manager/SceneManager.js";
import Scene from "./Scene";

export default class DemoScene implements Scene {
    constructor(private readonly manager: SceneManager) {
    }
    load(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    init(): void {
        throw new Error("Method not implemented.");
    }
    update(): void {
        throw new Error("Method not implemented.");
    }

}