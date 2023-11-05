import Manager from "./Manager.js";
import TextureManager from "./TextureManager.js";
import SceneManager from "./SceneManager.js";
import OffscreenCanvas from "../canvas2d/OffscreenCanvas.js";
import SingleColorCanvas from "../canvas2d/SingleColorCanvas.js";
import { Vec4 } from "../geometry/Vector.js";
import SingleColorTexture from "../texture/SingleColorTexture.js";


export default class OffscreenCanvasManager extends Manager<OffscreenCanvas> {
    private sceneManager?: SceneManager;
    private textureManager?: TextureManager;
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
        this.get(SingleColorCanvas).fillWithColor(new Vec4(0.5, 0.0, 0.0, 1.0))
        const imageData = this.getTextureManager().get(SingleColorTexture).getImageData(450, 1);
        console.log(...imageData.toFloatArray())
    }
    getTextureManager() {
        if (this.textureManager === undefined) {
            throw new Error("textureManager is undefined");
        }
        return this.textureManager;
    }
    setTextureManager(textureManager: TextureManager) {
        this.textureManager = textureManager;
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