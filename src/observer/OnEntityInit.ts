import AdrBodyText from "../drawobject/AdrBodyText.js";
import AdrHeadText from "../drawobject/AdrHeadText.js";
import AdrRoot from "../drawobject/AdrRoot.js";
import AdrManager from "../manager/AdrManager.js";
import EntitySubject from "../subject/EntitySubject.js";
import Observer from "./Observer.js";

export default class OnEntityInit extends Observer {
    private adrManager?: AdrManager;
    setAdrManager(adrManager: AdrManager) {
        this.adrManager = adrManager;
    }

    getSubject(): EntitySubject {
        const subject = super.getSubject();
        if (subject instanceof EntitySubject) {
            return subject;
        } else {
            throw new Error("subject is not EntitySubject!");
        }
    }

    public notify(): void {
        const entity = this.getSubject().getEntity();
        console.log("OnEntityInit", entity);
        if (entity.has(AdrRoot) && this.adrManager) {
            this.adrManager.initRoot(entity);
        } else if (entity.has(AdrHeadText) && this.adrManager) {
            this.adrManager.initHead(entity);
        } else if (entity.has(AdrBodyText) && this.adrManager) {
            this.adrManager.initBody(entity);
        }
    }

}
