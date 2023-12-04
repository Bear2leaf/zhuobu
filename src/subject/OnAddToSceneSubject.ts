import Entity from "../entity/Entity.js";
import Subject from "./Subject.js";

export default class OnAddToSceneSubject extends Subject {
    private entity?: Entity;
    getEntity(): Entity {
        if (!this.entity) throw new Error("entity is not set!");
        return this.entity;
    }
    setEntity(entity: Entity) {
        this.entity = entity;
    }
    public notify(): void {
        super.notify();
        this.entity = undefined;
    }

}
