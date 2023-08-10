import FrameBufferObject from "../framebuffer/FrameBufferObject.js";
import Manager from "./Manager.js";
import DepthFrameBufferObject from "../framebuffer/DepthFrameBufferObject.js";
import DepthTexture from "../texture/DepthTexture.js";
import TextureManager from "./TextureManager.js";
import DemoScene from "../scene/DemoScene.js";
import SceneManager from "./SceneManager.js";
import Renderer from "../renderer/Renderer.js";
import { ViewPortType } from "../device/Device.js";
import RenderFrameBufferObject from "../framebuffer/RenderFrameBufferObject.js";
import DefaultTexture from "../texture/DefaultTexture.js";
import PickTexture from "../texture/PickTexture.js";
import PickColorRed from "../pickcolor/PickColorRed.js";


export default class FrameBufferManager extends Manager<FrameBufferObject> {
    private sceneManager?: SceneManager;
    private textureManager?: TextureManager;
    private depthOnly: boolean = false
    private pickOnly: boolean = false
    addObjects(): void {
        [
            DepthFrameBufferObject,
            RenderFrameBufferObject,
        ].forEach((ctor) => {
            this.add(ctor);
        });
    }
    async load(): Promise<void> {
        
    }
    init(): void {
        this.all().forEach((fbo) => {
            fbo.create(this.getDevice().gl);
        });
    }
    update(): void {
        if (this.depthOnly) {
            this.get(DepthFrameBufferObject).attach(this.getTextureManager().get(DepthTexture));
            this.getDevice().viewportTo(ViewPortType.Full)
            this.getSceneManager().get(DemoScene).getComponents(Renderer).forEach((renderer) => renderer.render());
            this.get(DepthFrameBufferObject).unbind();
        } else if (this.pickOnly) {
            this.get(RenderFrameBufferObject).attach(this.getTextureManager().get(PickTexture));
            this.get(RenderFrameBufferObject).attach(this.getTextureManager().get(DepthTexture));
            // if (this.getDevice().gl.readSinglePixel(130, 108).x === 255) {
            //     console.log("picked red", ...this.getDevice().gl.readSinglePixel(130, 108).toFloatArray())
            // }
            this.getDevice().viewportTo(ViewPortType.Full)
            this.getSceneManager().get(DemoScene).getComponents(PickColorRed).forEach((component) => component.activate());
            this.getSceneManager().get(DemoScene).getComponents(Renderer).forEach((renderer) => renderer.render());
            this.get(RenderFrameBufferObject).unbind();
        }
    }
    setDepthOnly(depthOnly: boolean) {
        this.depthOnly = depthOnly;
    }
    setPickOnly(pickOnly: boolean) {
        this.pickOnly = pickOnly;
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
}