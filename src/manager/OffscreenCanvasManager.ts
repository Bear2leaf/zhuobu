import Manager from "./Manager.js";
import SceneManager from "./SceneManager.js";
import OffscreenCanvas from "../canvas/OffscreenCanvas.js";
import SingleColorCanvas from "../canvas/SingleColorCanvas.js";
import TimestepManager from "./TimestepManager.js";
import SDFCanvas from "../canvas/SDFCanvas.js";
import SDFCharacter from "../drawobject/SDFCharacter.js";
import DrawObject from "../drawobject/DrawObject.js";


export default class OffscreenCanvasManager extends Manager<OffscreenCanvas> {
    private sceneManager?: SceneManager;
    private timestepManager?: TimestepManager;
    setTimestepManager(timestepManager: TimestepManager) {
        this.timestepManager = timestepManager;
    }
    getTimestepManager(): TimestepManager {
        if (this.timestepManager === undefined) {
            throw new Error("timestepManager is undefined");
        }
        return this.timestepManager;
    }
    addObjects(): void {
        [
            SingleColorCanvas,
            SDFCanvas
        ].forEach((ctor) => {
            this.add<OffscreenCanvas>(ctor);
        });
    }
    async load(): Promise<void> {

    }
    init(): void {
        this.all().forEach(canvas => {
            canvas.initContext(this.getDevice());
            canvas.initEntity(this.getSceneManager());
        });
    }
    update(): void {
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
}