import Pointer from "../drawobject/Pointer.js";
import SDFCharacter from "../drawobject/SDFCharacter.js";
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
    getRendererManager(): RendererManager {
        if (this.rendererManager) {
            return this.rendererManager;
        } else {
            throw new Error("RendererManager not set!");
        }
    }
    public notify(): void {
        const entity = this.getSubject().getEntity();
        // console.log("OnEntityRender", entity);
        if (entity.has(SDFCharacter)) {
            this.getRendererManager().getSDFRenderer().render(entity.get(SDFCharacter));
        } else if (entity.has(DefaultSprite)) {
            this.getRendererManager().getSpriteRenderer().render(entity.get(DefaultSprite));
        } else if (entity.has(Flowers)) {
            this.getRendererManager().getBackSpriteRenderer().render(entity.get(Flowers));
        } else if (entity.has(Pointer)) {
            this.getRendererManager().getPointRenderer().render(entity.get(Pointer));
        }

    }

}
