import Entity from "../../entity/Entity.js";

export default abstract class AdrAdapter {
    private root?: Entity;
    private entity?: Entity;
    setEntity(entity: Entity) {
        this.entity = entity;
    }
    getEntity() {
        if (!this.entity) {
            throw new Error("Entity not found");
        }
        return this.entity;
    }
    setRoot(root: Entity) {
        this.root = root;
    }
    getRoot() {
        if (!this.root) {
            throw new Error("Root not found");
        }
        return this.root;
    }
    abstract init(): void;
}