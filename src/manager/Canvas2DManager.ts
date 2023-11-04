import Manager from "./Manager.js";
import TextureManager from "./TextureManager.js";
import SceneManager from "./SceneManager.js";
import Canvas2D from "../canvas2d/Canvas2D.js";
import BlankColorCanvas from "../canvas2d/BlankColorCanvas.js";


export default class Canvas2DManager extends Manager<Canvas2D> {
    private sceneManager?: SceneManager;
    private textureManager?: TextureManager;
    addObjects(): void {
        [
            BlankColorCanvas
        ].forEach((ctor) => {
            this.add(ctor);
        });
    }
    async load(): Promise<void> {

    }
    init(): void {
        this.all().forEach((canvas) => {
        });
    }
    update(): void {
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