import TextureManager from "./TextureManager.js";
import SceneManager from "./SceneManager.js";
import DepthFrameBufferObject from "../framebuffer/DepthFrameBufferObject.js";
import PickFrameBufferObject from "../framebuffer/PickFrameBufferObjectx.js";
import RenderFrameBufferObject from "../framebuffer/RenderFrameBufferObject.js";
import Device, { ViewPortType } from "../device/Device.js";
import OnClickPickSubject from "../subject/OnClickPickSubject.js";
import RendererManager from "./RendererManager.js";
import GLTFMeshRenderer from "../renderer/GLTFMeshRenderer.js";


export default class FrameBufferManager {
    private readonly depthFrameBufferObject = new DepthFrameBufferObject;
    private readonly pickFrameBufferObject = new PickFrameBufferObject;
    private readonly renderFrameBufferObject = new RenderFrameBufferObject;
    private sceneManager?: SceneManager;
    private textureManager?: TextureManager;
    private rendererManager?: RendererManager;
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
            fbo.attach(this.getTextureManager().getDepthTexture());
            fbo.attach(this.getTextureManager().getRenderTexture());
            fbo.attach(this.getTextureManager().getPickTexture());
        });
        // this.getSceneManager().first().getComponents(OnClickPickSubject).forEach((subject, index) => {
        //     subject.getColor().set(index + 1, 0, 0, 255)
        //     subject.setFrameBufferObject(this.pickFrameBufferObject);
        // });

    }
    update(): void {
        const all =
            [
                this.depthFrameBufferObject,
                this.pickFrameBufferObject,
                this.renderFrameBufferObject,
            ];
        all.forEach(fbo => fbo.bind());
        this.getDevice().viewportTo(ViewPortType.Full)
        // const renderer = this.getRendererManager().get(GLTFMeshRenderer);
        // this.getSceneManager().first().getComponents(OnClickPickSubject).forEach((subject) => {
        //     subject.activate();
        //     renderer.getShader().use();
        //     renderer.getShader().setVector3u("u_pickColor", subject.getColor());
        //     renderer.render();
        //     subject.deactivate();
        // });
        all.forEach(fbo => fbo.unbind());
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
    getRendererManager(): RendererManager {
        if (this.rendererManager === undefined) {
            throw new Error("rendererManager is undefined");
        }
        return this.rendererManager;
    }
    setRendererManager(rendererManager: RendererManager) {
        this.rendererManager = rendererManager;
    }
}