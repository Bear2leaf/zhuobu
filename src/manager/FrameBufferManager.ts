import TextureManager from "./TextureManager.js";
import DepthFrameBufferObject from "../framebuffer/DepthFrameBufferObject.js";
import PickFrameBufferObject from "../framebuffer/PickFrameBufferObject.js";
import RenderFrameBufferObject from "../framebuffer/RenderFrameBufferObject.js";
import Device from "../device/Device.js";
import RendererManager from "./RendererManager.js";
import EventManager from "./EventManager.js";


export default class FrameBufferManager {
    private readonly depthFrameBufferObject = new DepthFrameBufferObject;
    private readonly pickFrameBufferObject = new PickFrameBufferObject;
    private readonly renderFrameBufferObject = new RenderFrameBufferObject;
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
        ].forEach((fbo) => {
            fbo.create(this.getDevice().getRenderingContext());
        });

        this.depthFrameBufferObject.attach(this.getTextureManager().depthTexture);
        this.pickFrameBufferObject.attach(this.getTextureManager().pickTexture);
        this.renderFrameBufferObject.attach(this.getTextureManager().renderTexture);
    }
    initObservers() {
        this.getEventManager().clickPick.setFrameBufferObject(this.pickFrameBufferObject);
        this.getEventManager().onEntityRender.setFrameBufferManager(this);
    }
    bindPickFramebuffer(): void {
        this.pickFrameBufferObject.bind();
    }
    unbindPickFramebuffer(): void {
        this.pickFrameBufferObject.unbind();
    }
    processPickFramebuffer(): void {

        this.bindPickFramebuffer();
        this.getRendererManager().getSDFRenderer().render(false);
        this.unbindPickFramebuffer();
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