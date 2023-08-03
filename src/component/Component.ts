import Entity from "../entity/Entity.js";

export default abstract class Component {
    getViewInverse() {
        throw new Error("Method not implemented.");
    }
    private entity?: Entity;
    setEntity(entity: Entity) {
        this.entity = entity;
    }
    getEntity() {
        if (!this.entity) {
            throw new Error("entity not exist");
        }
        return this.entity;
    }
    init() {

    }
    update() {
        
    }
}