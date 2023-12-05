import DefaultTexture from "../texture/DefaultTexture.js";
import DepthTexture from "../texture/DepthTexture.js";
import FlowerTexture from "../texture/FlowerTexture.js";
import FontTexture from "../texture/FontTexture.js";
import JointTexture from "../texture/JointTexture.js";
import PickTexture from "../texture/PickTexture.js";
import RenderTexture from "../texture/RenderTexture.js";
import CacheManager from "./CacheManager.js";
import SingleColorTexture from "../texture/SingleColorTexture.js";
import SDFTexture from "../texture/SDFTexture.js";
import Device from "../device/Device.js";
import EventManager from "./EventManager.js";
import OnEntityRegisterComponents from "../observer/OnEntityRegisterComponents.js";


export default class TextureManager {
    readonly defaultTexture = new DefaultTexture;
    readonly fontTexture = new FontTexture;
    readonly flowerTexture = new FlowerTexture;
    readonly jointTexture = new JointTexture;
    readonly depthTexture = new DepthTexture;
    readonly pickTexture = new PickTexture;
    readonly renderTexture = new RenderTexture;
    readonly singleColorTexture = new SingleColorTexture;
    readonly sdfTexture = new SDFTexture;
    private cacheManager?: CacheManager;
    private eventManager?: EventManager;
    async load(): Promise<void> {
        await this.getCacheManager().loadImageCache("flowers");
        await this.getCacheManager().loadFontCache("boxy_bold_font");
    }
    setDevice(device: Device) {
        this.defaultTexture.setDevice(device);
        this.fontTexture.setDevice(device);
        this.flowerTexture.setDevice(device);
        this.jointTexture.setDevice(device);
        this.depthTexture.setDevice(device);
        this.pickTexture.setDevice(device);
        this.renderTexture.setDevice(device);
        this.singleColorTexture.setDevice(device);
        this.sdfTexture.setDevice(device);
    }
    initTextures() {
        this.flowerTexture.generate(2, 2, this.getCacheManager().getImage("flowers"));
    }
    initObservers() {

        const onEntityRegisterComponents = new OnEntityRegisterComponents;
        onEntityRegisterComponents.setTextureManager(this);
        onEntityRegisterComponents.setSubject(this.getEventManager().entityRegisterComponents);
    }
    getEventManager(): EventManager {
        if (this.eventManager === undefined) {
            throw new Error("eventManager is undefined");
        }
        return this.eventManager;
    }
    setEventManager(eventManager: EventManager) {
        this.eventManager = eventManager;
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
}