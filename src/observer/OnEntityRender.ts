import AnimationController from "../controller/AnimationController.js";
import DrawObject from "../drawobject/DrawObject.js";
import HelloWireframe from "../drawobject/HelloWireframe.js";
import Pointer from "../drawobject/Pointer.js";
import SDFCharacter from "../drawobject/SDFCharacter.js";
import SkinMesh from "../drawobject/SkinMesh.js";
import RendererManager from "../manager/RendererManager.js";
import DefaultSprite from "../sprite/DefaultSprite.js";
import Flowers from "../sprite/Flowers.js";
import EntitySubject from "../subject/EntitySubject.js";
import Observer from "./Observer.js";

export default class OnEntityRender extends Observer {
    private rendererManager?: RendererManager;
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
    public notify(): void {
        const entity = this.getSubject().getEntity();
        if (entity.get(DrawObject) && this.rendererManager) {
            if (entity.has(SDFCharacter)) {
                this.rendererManager.getSDFRenderer().render(entity.get(SDFCharacter));
            } else if (entity.has(DefaultSprite)) {
                this.rendererManager.getSpriteRenderer().render(entity.get(DefaultSprite));
            } else if (entity.has(Flowers)) {
                this.rendererManager.getBackSpriteRenderer().render(entity.get(Flowers));
            } else if (entity.has(Pointer)) {
                this.rendererManager.getPointRenderer().render(entity.get(Pointer));
            } else if (entity.has(HelloWireframe)) {
                this.rendererManager.getWireframeRenderer().render(entity.get(HelloWireframe));
            } else if (entity.has(SkinMesh)) {
                if (entity.has(AnimationController)) {
                    this.rendererManager.getSkinMeshRenderer().render(entity.get(SkinMesh));
                } else {
                    this.rendererManager.getMeshRenderer().render(entity.get(SkinMesh));
                }
            }
        }

    }

}
