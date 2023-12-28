import TextureManager from "./TextureManager.js";
import PickFrameBufferObject from "../framebuffer/PickFrameBufferObject.js";
import RenderFrameBufferObject from "../framebuffer/RenderFrameBufferObject.js";
import Device from "../device/Device.js";
import RendererManager from "./RendererManager.js";
import EventManager from "./EventManager.js";
import DepthFrameBufferObject from "../framebuffer/DepthFrameBufferObject.js";
import ReflectFrameBufferObject from "../framebuffer/ReflectFrameBufferObject.js";


export default class FrameBufferManager {
    private readonly depthFrameBufferObject = new DepthFrameBufferObject;
    private readonly pickFrameBufferObject = new PickFrameBufferObject;
    private readonly renderFrameBufferObject = new RenderFrameBufferObject;
    private readonly reflectFrameBufferObject = new ReflectFrameBufferObject;
    private textureManager?: TextureManager;
    private rendererManager?: RendererManager;
    private eventManager?: EventManager;
    private device?: Device;
    setDevice(device: Device) {
        this.device = device;
    }
    getDevice(): Device {
        if (this.device === undefined) {
            throw new Error("device is undefined");
        }
        return this.device;
    }
    initFramebuffer(): void {
        [
            this.depthFrameBufferObject,
            this.pickFrameBufferObject,
            this.renderFrameBufferObject,
            this.reflectFrameBufferObject,
        ].forEach((fbo) => {
            fbo.create(this.getDevice().getRenderingContext());
        });

        this.depthFrameBufferObject.attach(this.getTextureManager().depthTexture);
        this.pickFrameBufferObject.attach(this.getTextureManager().pickTexture);
        this.renderFrameBufferObject.attach(this.getTextureManager().renderTexture);
        this.reflectFrameBufferObject.attach(this.getTextureManager().reflectTexture);
    }
    initObservers() {
        this.getEventManager().clickPick.setFrameBufferObject(this.pickFrameBufferObject);
        this.getEventManager().onEntityRender.setFrameBufferManager(this);
    }
    processFramebuffer(): void {
        const camera = this.getRendererManager().getSkyboxRenderer().getCamera();
        this.renderFrameBufferObject.bind();
        this.getEventManager().viewPortChange.notify();
        this.getRendererManager().getSkyboxRenderer().render(false);
        this.getRendererManager().getSkinMeshRenderer().render(false);
        this.getRendererManager().getMeshRenderer().render(false);
        this.getRendererManager().getTerrianRenderer().render(false);
        this.renderFrameBufferObject.unbind();
        this.reflectFrameBufferObject.bind();
        this.getEventManager().viewPortChange.notify();
        camera.reflect(true);
        this.getRendererManager().getSkyboxRenderer().render(false);
        this.getRendererManager().getSkinMeshRenderer().render(false);
        this.getRendererManager().getMeshRenderer().render(false);
        this.getRendererManager().getTerrianRenderer().render(false);
        this.reflectFrameBufferObject.unbind();
        camera.reflect();
        this.pickFrameBufferObject.bind();
        this.getRendererManager().getSDFRenderer().render(false);
        this.pickFrameBufferObject.unbind();
        this.depthFrameBufferObject.bind();
        this.getEventManager().viewPortChange.notify();
        this.getRendererManager().getSkinMeshRenderer().renderShadow();
        this.getRendererManager().getMeshRenderer().renderShadow();
        this.depthFrameBufferObject.unbind();
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
    getRendererManager(): RendererManager {
        if (this.rendererManager === undefined) {
            throw new Error("rendererManager is undefined");
        }
        return this.rendererManager;
    }
    setRendererManager(rendererManager: RendererManager) {
        this.rendererManager = rendererManager;
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
}