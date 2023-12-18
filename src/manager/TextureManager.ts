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
import { TextureBindIndex } from "../texture/Texture.js";


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
    private device?: Device;
    private cacheManager?: CacheManager;
    private eventManager?: EventManager;
    async load(): Promise<void> {
        await this.getCacheManager().loadImageCache("flowers");
        await this.getCacheManager().loadFontCache("boxy_bold_font");
    }
    setDevice(device: Device) {
        this.device = device;
    }
    getDevice() {
        if (!this.device) {
            throw new Error("Device not found");
        }
        return this.device;
    }
    initTextures() {

        const glContext= this.getDevice().getRenderingContext();
        this.defaultTexture.setContext(glContext);
        this.fontTexture.setContext(glContext);
        this.flowerTexture.setContext(glContext);
        this.jointTexture.setContext(glContext);
        this.depthTexture.setContext(glContext);
        this.pickTexture.setContext(glContext);
        this.renderTexture.setContext(glContext);
        this.singleColorTexture.setContext(glContext);
        this.sdfTexture.setContext(glContext);

        this.singleColorTexture.setCanvasContext(this.getDevice().getOffscreenCanvasRenderingContext());
        this.sdfTexture.setCanvasContext(this.getDevice().getSDFCanvasRenderingContext());

        this.jointTexture.setBindIndex(TextureBindIndex.Joint);
        this.depthTexture.setBindIndex(TextureBindIndex.Depth);
        this.pickTexture.setBindIndex(TextureBindIndex.Pick);
        this.renderTexture.setBindIndex(TextureBindIndex.Render);
        this.singleColorTexture.setBindIndex(TextureBindIndex.OffscreenCanvas);
        this.sdfTexture.setBindIndex(TextureBindIndex.OffscreenCanvas);

        const windowInfo = this.getDevice().getWindowInfo();
        this.defaultTexture.generate(new Float32Array([1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1]), 2, 2);
        this.flowerTexture.generate(this.getCacheManager().getImage("flowers"));
        this.pickTexture.generate(undefined, windowInfo.windowWidth * windowInfo.pixelRatio, windowInfo.windowHeight * windowInfo.pixelRatio);
        this.renderTexture.generate(undefined, windowInfo.windowWidth * windowInfo.pixelRatio, windowInfo.windowHeight * windowInfo.pixelRatio);
        this.depthTexture.generate(undefined, windowInfo.windowWidth * windowInfo.pixelRatio, windowInfo.windowHeight * windowInfo.pixelRatio);
    }
    initObservers() {

        this.getEventManager().onEntityRegisterComponents.setTextureManager(this);
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