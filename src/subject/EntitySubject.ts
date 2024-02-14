import Entity from "../entity/Entity.js";
import EntityObserver from "../observer/EntityObserver.js";
import Observer from "../observer/Observer.js";
import Subject from "./Subject.js";

export default class EntitySubject extends Subject {
    private entity?: Entity;
    private readonly observers: EntityObserver[] = [];
    public register(observer: Observer): void {
        if (observer instanceof EntityObserver) {
            this.observers.push(observer);
        } else {
            throw new Error("Not support observer");
        }
        super.register(observer);
    }
    getEntity(): Entity {
        if (!this.entity) throw new Error("entity is not set!");
        return this.entity;
    }
    setEntity(entity: Entity) {
        this.entity = entity;
    }
    public notify(): void {
        this.observers.forEach(observer => {
            observer.entity = this.getEntity();
        })
        super.notify();
        this.observers.forEach(observer => {
            observer.entity = undefined;
        })
    }

}
