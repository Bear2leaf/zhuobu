import DefaultTexture from "../texture/DefaultTexture.js";
import DepthTexture from "../texture/DepthTexture.js";
import FlowerTexture from "../texture/FlowerTexture.js";
import FontTexture from "../texture/FontTexture.js";
import JointTexture from "../texture/JointTexture.js";
import PickTexture from "../texture/PickTexture.js";
import RenderTexture from "../texture/RenderTexture.js";
import CacheManager from "./CacheManager.js";
import SceneManager from "./SceneManager.js";
import SingleColorTexture from "../texture/SingleColorTexture.js";
import SDFTexture from "../texture/SDFTexture.js";
import Device from "../device/Device.js";
import Texture from "../texture/Texture.js";


export default class TextureManager {
    private readonly defaultTexture = new DefaultTexture;
    private readonly fontTexture = new FontTexture;
    private readonly flowerTexture = new FlowerTexture;
    private readonly jointTexture = new JointTexture;
    private readonly depthTexture = new DepthTexture;
    private readonly pickTexture = new PickTexture;
    private readonly renderTexture = new RenderTexture;
    private readonly singleColorTexture = new SingleColorTexture;
    private readonly sdfTexture = new SDFTexture;
    private cacheManager?: CacheManager;
    private sceneManager?: SceneManager;
    async load(): Promise<void> {
        await this.getCacheManager().loadImageCache("flowers");
        await this.getCacheManager().loadFontCache("boxy_bold_font");
    }
    initTexture(device: Device): void {
        [
            this.defaultTexture,
            this.fontTexture,
            this.flowerTexture,
            this.jointTexture,
            this.depthTexture,
            this.pickTexture,
            this.renderTexture,
            this.singleColorTexture,
            this.sdfTexture
        ].forEach(texture => {
            texture.setSceneManager(this.getSceneManager());
            texture.setCacheManager(this.getCacheManager());
            texture.setDevice(device);
            texture.init();

        });
    }
    getPickTexture(): Texture {
        return this.pickTexture;
    }
    getDepthTexture(): Texture {
        return this.depthTexture;
    }
    getRenderTexture(): Texture {
        return this.renderTexture;
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
}