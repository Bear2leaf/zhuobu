import TextureManager from "./TextureManager.js";
import DepthFrameBufferObject from "../framebuffer/DepthFrameBufferObject.js";
import PickFrameBufferObject from "../framebuffer/PickFrameBufferObject.js";
import RenderFrameBufferObject from "../framebuffer/RenderFrameBufferObject.js";
import Device, { ViewPortType } from "../device/Device.js";
import RendererManager from "./RendererManager.js";
import OnEntityRender from "../observer/OnEntityRender.js";
import EventManager from "./EventManager.js";
import OnClickPickSayHello from "../observer/OnClickPickSayHello.js";


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
        const onEntityRender = new OnEntityRender;
        onEntityRender.setFrameBufferManager(this);
        onEntityRender.setRendererManager(this.getRendererManager());
        onEntityRender.setSubject(this.getEventManager().entityRender);
        this.getEventManager().clickPick.setFrameBufferObject(this.pickFrameBufferObject);
        const onClickPick = new OnClickPickSayHello();
        onClickPick.setSubject(this.getEventManager().clickPick);
    }
    bindPickFramebuffer(): void {
        this.pickFrameBufferObject.bind();
        this.getDevice().viewportTo(ViewPortType.Full);
    }
    unbindPickFramebuffer(): void {
        this.pickFrameBufferObject.unbind();
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