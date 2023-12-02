import FrameBufferObject from "../framebuffer/FrameBufferObject.js";
import Manager from "./Manager.js";
import DepthTexture from "../texture/DepthTexture.js";
import TextureManager from "./TextureManager.js";
import DemoScene from "../scene/DemoScene.js";
import SceneManager from "./SceneManager.js";
import Renderer from "../renderer/Renderer.js";
import DepthFrameBufferObject from "../framebuffer/DepthFrameBufferObject.js";
import PickFrameBufferObject from "../framebuffer/PickFrameBufferObjectx.js";
import RenderFrameBufferObject from "../framebuffer/RenderFrameBufferObject.js";
import PickTexture from "../texture/PickTexture.js";
import { ViewPortType } from "../device/Device.js";
import OnClickPickSubject from "../subject/OnClickPickSubject.js";
import RenderTexture from "../texture/RenderTexture.js";
import RendererManager from "./RendererManager.js";


export default class FrameBufferManager extends Manager<FrameBufferObject> {
    private sceneManager?: SceneManager;
    private textureManager?: TextureManager;
    private rendererManager?: RendererManager;
    addObjects(): void {
        [
            DepthFrameBufferObject,
            PickFrameBufferObject,
            RenderFrameBufferObject,
        ].forEach((ctor) => {
            this.add(ctor);
        });
    }
    async load(): Promise<void> {

    }
    init(): void {
        this.all().forEach((fbo) => {
            fbo.create(this.getDevice().getRenderingContext());
            fbo.attach(this.getTextureManager().get(DepthTexture));
            fbo.attach(this.getTextureManager().get(RenderTexture));
            fbo.attach(this.getTextureManager().get(PickTexture));
        });
        this.getSceneManager()
            .all()
            .filter(scene => scene instanceof (DemoScene))
            .forEach(scene => scene.getComponents(OnClickPickSubject).forEach((subject, index) => {
                subject.getColor().set(index + 1, 0, 0, 255)
                subject.setFrameBufferObject(this.get(PickFrameBufferObject));
            }));

    }
    update(): void {
        this.all().forEach(fbo => fbo.bind());
        this.getDevice().viewportTo(ViewPortType.Full)
        this.getRendererManager().all().forEach(renderer => {
            this.getSceneManager().get(DemoScene).getComponents(OnClickPickSubject).forEach((subject) => {
                subject.activate();
                renderer.render();
                subject.deactivate();
            });
        });
        this.all().forEach(fbo => fbo.unbind());
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