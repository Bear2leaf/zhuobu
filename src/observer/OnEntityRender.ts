import AnimationController from "../controller/AnimationController.js";
import DrawObject from "../drawobject/DrawObject.js";
import HelloWireframe from "../drawobject/HelloWireframe.js";
import Pointer from "../drawobject/Pointer.js";
import SDFCharacter from "../drawobject/SDFCharacter.js";
import SkinMesh from "../drawobject/SkinMesh.js";
import Skybox from "../drawobject/Skybox.js";
import FrameBufferManager from "../manager/FrameBufferManager.js";
import RendererManager from "../manager/RendererManager.js";
import DefaultSprite from "../sprite/DefaultSprite.js";
import Flowers from "../sprite/Flowers.js";
import EntitySubject from "../subject/EntitySubject.js";
import Observer from "./Observer.js";

export default class OnEntityRender extends Observer {
    private rendererManager?: RendererManager;
    private framebufferManager?: FrameBufferManager;
    getSubject(): EntitySubject {
        const subject = super.getSubject();
        if (subject instanceof EntitySubject) {
            return subject;
        } else {
            throw new Error("subject is not EntitySubject!");
        }
    }

    setRendererManager(rendererManager: RendererManager) {
        this.rendererManager = rendererManager;
    }
    setFrameBufferManager(framebufferManager: FrameBufferManager) {
        this.framebufferManager = framebufferManager;
    }
    public notify(): void {
        const entity = this.getSubject().getEntity();
        if (entity.has(DrawObject) && this.rendererManager) {
            entity.get(DrawObject).updateModel();
            if (entity.has(SDFCharacter) && this.framebufferManager) {
                this.rendererManager.getSDFRenderer().addObject(entity.get(SDFCharacter));
            } else if (entity.has(DefaultSprite)) {
                this.rendererManager.getSpriteRenderer().addObject(entity.get(DefaultSprite));
            } else if (entity.has(Flowers)) {
                this.rendererManager.getBackSpriteRenderer().addObject(entity.get(Flowers));
            } else if (entity.has(Pointer)) {
                this.rendererManager.getPointRenderer().addObject(entity.get(Pointer));
            } else if (entity.has(HelloWireframe)) {
                this.rendererManager.getWireframeRenderer().addObject(entity.get(HelloWireframe));
            } else if (entity.has(Skybox)) {
                this.rendererManager.getSkyboxRenderer().addObject(entity.get(Skybox));
            } else if (entity.has(SkinMesh)) {
                if (entity.has(AnimationController)) {
                    this.rendererManager.getSkinMeshRenderer().addObject(entity.get(SkinMesh));
                } else {
                    this.rendererManager.getMeshRenderer().addObject(entity.get(SkinMesh));
                }
            }
        }
    }

}
