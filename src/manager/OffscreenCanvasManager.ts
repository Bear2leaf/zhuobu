import SceneManager from "./SceneManager.js";
import SingleColorCanvas from "../canvas/SingleColorCanvas.js";
import SDFCanvas from "../canvas/SDFCanvas.js";
import Device from "../device/Device.js";


export default class OffscreenCanvasManager {
    private readonly offscreenCanvas = new SingleColorCanvas;
    private readonly sdfCanvas = new SDFCanvas;
    private sceneManager?: SceneManager
    setSceneManager(sceneManager: SceneManager) {
        this.sceneManager = sceneManager;
    }
    getSceneManager(): SceneManager {
        if (this.sceneManager === undefined) {
            throw new Error("sceneManager is undefined");
        }
        return this.sceneManager;
    }
    initOffscreenCanvas(device: Device): void {
        this.offscreenCanvas.setContext(device.getOffscreenCanvasRenderingContext());
        this.sdfCanvas.setContext(device.getSDFCanvasRenderingContext());
        this.sdfCanvas.initEntities(this.getSceneManager());

    }
}