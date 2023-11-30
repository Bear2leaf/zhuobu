import Manager from "./Manager.js";
import SceneManager from "./SceneManager.js";
import OffscreenCanvas from "../canvas/OffscreenCanvas.js";
import SingleColorCanvas from "../canvas/SingleColorCanvas.js";
import TimestepManager from "./TimestepManager.js";
import SDFCanvas from "../canvas/SDFCanvas.js";
import SDFCharacter from "../drawobject/SDFCharacter.js";
import TextureContainer from "../container/TextureContainer.js";


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
        this.get(SingleColorCanvas).setContext(this.getDevice().getOffscreenCanvasRenderingContext())
        this.get(SDFCanvas).setContext(this.getDevice().getSDFCanvasRenderingContext())
        this.getSceneManager().all().forEach(scene => scene.getComponents(SDFCharacter).forEach(text => {
            const texSize = this.get(SDFCanvas).getTinySDF().getCanvasSize();
            text.setFontInfo(this.get(SDFCanvas).getFontInfo(), texSize.x, texSize.y);
            text.getEntity().get(TextureContainer).getTexture().generate(texSize.x, texSize.y);
        }));
    }
    update(): void {
        const r = (Math.sin(this.getTimestepManager().getFrames() / 100) + 1.0) / 2.0;
        const windowInfo = this.getDevice().getCanvasInfo();
        this.all().forEach((canvas) => {
            canvas.fillWithColor(r, 1 - r, r * r * r);
            canvas.clearRect(0, 0, windowInfo.windowWidth, 96);
            canvas.fillWithText(`FPS: ${this.getTimestepManager().getFPS().toFixed(2)}`);
        });
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