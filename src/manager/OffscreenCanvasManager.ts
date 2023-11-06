import Manager from "./Manager.js";
import TextureManager from "./TextureManager.js";
import SceneManager from "./SceneManager.js";
import OffscreenCanvas from "../canvas2d/OffscreenCanvas.js";
import SingleColorCanvas from "../canvas2d/SingleColorCanvas.js";
import { Vec3, Vec4 } from "../geometry/Vector.js";
import TimestepManager from "./TimestepManager.js";


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
            SingleColorCanvas
        ].forEach((ctor) => {
            this.add(ctor);
        });
    }
    async load(): Promise<void> {

    }
    init(): void {
        this.all().forEach((canvas) => {
            canvas.setContext(this.getDevice().getOffscreenCanvasRenderingContext())
        });
    }
    update(): void {
        const r = (Math.sin(this.getTimestepManager().getFrames() / 100) + 1.0) / 2.0;
        this.get(SingleColorCanvas).fillWithColor(r, 1 - r, r * r * r);
        const windowInfo = this.getDevice().getWindowInfo();
        this.get(SingleColorCanvas).clearRect(0, windowInfo.windowHeight / 2 - 48, windowInfo.windowWidth, 96);
        this.get(SingleColorCanvas).fillWithText(`FPS: ${this.getTimestepManager().getFPS().toFixed(2)}`);
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