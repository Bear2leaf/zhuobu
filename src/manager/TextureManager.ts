import Scene from "../scene/Scene.js";
import DefaultTexture from "../texture/DefaultTexture.js";
import DepthTexture from "../texture/DepthTexture.js";
import FlowerTexture from "../texture/FlowerTexture.js";
import FontTexture from "../texture/FontTexture.js";
import JointTexture from "../texture/JointTexture.js";
import PickTexture from "../texture/PickTexture.js";
import RenderTexture from "../texture/RenderTexture.js";
import Texture from "../texture/Texture.js";
import CacheManager from "./CacheManager.js";
import Manager from "./Manager.js";
import SceneManager from "./SceneManager.js";
import SingleColorTexture from "../texture/SingleColorTexture.js";
import SDFTexture from "../texture/SDFTexture.js";


export default class TextureManager extends Manager<Texture> {
    private cacheManager?: CacheManager;
    private sceneManager?: SceneManager;
    addObjects(): void {
        [
            DefaultTexture,
            FontTexture,
            FlowerTexture,
            JointTexture,
            DepthTexture,
            PickTexture,
            RenderTexture,
            SingleColorTexture,
            SDFTexture,
        ].forEach((ctor) => {
            this.add<Texture>(ctor);
        });
    }
    async load(): Promise<void> {

        await this.getCacheManager().loadImageCache("flowers");
        await this.getCacheManager().loadFontCache("boxy_bold_font");
    }
    init(): void {
        this.all().forEach(texture => {
            texture.setSceneManager(this.getSceneManager());
            texture.setCacheManager(this.getCacheManager());
            texture.setDevice(this.getDevice());
            texture.init();
        });
        

    }
    update(): void {
    }
    setCacheManager(cacheManager: CacheManager) {
        this.cacheManager = cacheManager;
    }
    getCacheManager(): CacheManager {
        if (this.cacheManager === undefined) {
            throw new Error("cacheManager is undefined");
        }
        return this.cacheManager;
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
}