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
import { TextureBindIndex } from "../texture/Texture.js";
import SkyboxTexture from "../texture/SkyboxTexture.js";
import ReflectTexture from "../texture/ReflectTexture.js";
import WaterNormalTexture from "../texture/WaterNormalTexture.js";
import WaterDistortionTexture from "../texture/WaterDistortionTexture.js";
import TerrianTexture from "../texture/TerrianTexture.js";
import GLTFManager from "./GLTFManager.js";


export default class TextureManager {
    readonly defaultTexture = new DefaultTexture;
    readonly fontTexture = new FontTexture;
    readonly flowerTexture = new FlowerTexture;
    readonly terrianTexture = new TerrianTexture;
    readonly waterNormalTexture = new WaterNormalTexture;
    readonly waterDistortionTexture = new WaterDistortionTexture;
    readonly jointTexture = new JointTexture;
    readonly skyboxTexture = new SkyboxTexture;
    readonly depthTexture = new DepthTexture;
    readonly waterDepthTexture = new DepthTexture;
    readonly pickTexture = new PickTexture;
    readonly renderTexture = new RenderTexture;
    readonly reflectTexture = new ReflectTexture;
    readonly singleColorTexture = new SingleColorTexture;
    readonly sdfTexture = new SDFTexture;
    private device?: Device;
    private cacheManager?: CacheManager;
    private eventManager?: EventManager;
    private gltfManager?: GLTFManager;
    async load(): Promise<void> {
        await this.getCacheManager().loadImageCache("flowers");
        await this.getCacheManager().loadImageCache("water_distortion");
        await this.getCacheManager().loadImageCache("water_normal");
        await this.getCacheManager().loadSkyboxCache("vz_clear_ocean");
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
        this.terrianTexture.setContext(glContext);
        this.fontTexture.setContext(glContext);
        this.flowerTexture.setContext(glContext);
        this.waterDistortionTexture.setContext(glContext);
        this.waterNormalTexture.setContext(glContext);
        this.waterDepthTexture.setContext(glContext);
        this.jointTexture.setContext(glContext);
        this.skyboxTexture.setContext(glContext);
        this.depthTexture.setContext(glContext);
        this.pickTexture.setContext(glContext);
        this.renderTexture.setContext(glContext);
        this.reflectTexture.setContext(glContext);
        this.singleColorTexture.setContext(glContext);
        this.sdfTexture.setContext(glContext);

        this.singleColorTexture.setCanvasContext(this.getDevice().getOffscreenCanvasRenderingContext());
        this.sdfTexture.setCanvasContext(this.getDevice().getSDFCanvasRenderingContext());

        this.jointTexture.setBindIndex(TextureBindIndex.Joint);
        this.skyboxTexture.setBindIndex(TextureBindIndex.Skybox);
        this.depthTexture.setBindIndex(TextureBindIndex.Depth);
        this.waterDepthTexture.setBindIndex(TextureBindIndex.Depth);
        this.pickTexture.setBindIndex(TextureBindIndex.Pick);
        this.renderTexture.setBindIndex(TextureBindIndex.Render);
        this.reflectTexture.setBindIndex(TextureBindIndex.Reflect);
        this.singleColorTexture.setBindIndex(TextureBindIndex.OffscreenCanvas);
        this.sdfTexture.setBindIndex(TextureBindIndex.OffscreenCanvas);
        this.waterDistortionTexture.setBindIndex(TextureBindIndex.WaterDistortion);
        this.waterNormalTexture.setBindIndex(TextureBindIndex.WaterNormal);

        const windowInfo = this.getDevice().getWindowInfo();
        this.defaultTexture.active();
        this.defaultTexture.bind();
        this.defaultTexture.generate(new Float32Array(16).fill(1), 2, 2);
        // this.defaultTexture.generate(new Float32Array([1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1]), 2, 2);
        this.flowerTexture.active();
        this.flowerTexture.bind();
        this.flowerTexture.generate(this.getCacheManager().getImage("flowers"));
        this.terrianTexture.active();
        this.terrianTexture.bind();
        this.terrianTexture.generate(this.getGLTFManager().terrianGLTF.getImages()[0].getImage());
        this.skyboxTexture.active();
        this.skyboxTexture.bind();
        this.skyboxTexture.generate(this.getCacheManager().getSkybox("vz_clear_ocean"));
        this.waterNormalTexture.active();
        this.waterNormalTexture.bind();
        this.waterNormalTexture.generate(this.getCacheManager().getImage("water_normal"));
        this.waterDistortionTexture.active();
        this.waterDistortionTexture.bind();
        this.waterDistortionTexture.generate(this.getCacheManager().getImage("water_distortion"));
        this.pickTexture.active();
        this.pickTexture.bind();
        this.pickTexture.generate(undefined, windowInfo.windowWidth * windowInfo.pixelRatio, windowInfo.windowHeight * windowInfo.pixelRatio);
        this.renderTexture.active();
        this.renderTexture.bind();
        this.renderTexture.generate(undefined, windowInfo.windowWidth * windowInfo.pixelRatio, windowInfo.windowHeight * windowInfo.pixelRatio);

        this.reflectTexture.active();
        this.reflectTexture.bind();
        this.reflectTexture.generate(undefined, windowInfo.windowWidth * windowInfo.pixelRatio, windowInfo.windowHeight * windowInfo.pixelRatio);

        this.depthTexture.active();
        this.depthTexture.bind();
        this.depthTexture.generate(undefined, windowInfo.windowWidth * windowInfo.pixelRatio, windowInfo.windowHeight * windowInfo.pixelRatio);

        this.waterDepthTexture.active();
        this.waterDepthTexture.bind();
        this.waterDepthTexture.generate(undefined, windowInfo.windowWidth * windowInfo.pixelRatio, windowInfo.windowHeight * windowInfo.pixelRatio);

    }
    initObservers() {

        this.getEventManager().onEntityInit.setTextureManager(this);
    }
    getEventManager(): EventManager {
        if (this.eventManager === undefined) {
            throw new Error("eventManager is undefined");
        }
        return this.eventManager;
    }
    setGLTFManager(gltfManager: GLTFManager) {
        this.gltfManager = gltfManager;
    }
    getGLTFManager(): GLTFManager {
        if (this.gltfManager === undefined) {
            throw new Error("gltfManager is undefined");
        }
        return this.gltfManager;
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