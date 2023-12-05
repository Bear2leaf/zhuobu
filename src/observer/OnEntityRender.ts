import SDFCharacter from "../drawobject/SDFCharacter.js";
import RendererManager from "../manager/RendererManager.js";
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
        }

    }

}
