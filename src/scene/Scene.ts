import Component from "../entity/Component.js";
import Entity from "../entity/Entity.js";
import EntityInit from "../subject/EntityInit.js";

export default abstract class Scene {
    private readonly entities: Entity[] = [];
    private entityInit?: EntityInit;
    abstract getDefaultEntities(): Entity[];
    registerEntities(): void {
        this.getDefaultEntities().forEach(entity => this.addEntity(entity));
        this.entities.forEach(entity => entity.registerComponents());
    }
    update(): void {
        this.entities.forEach(entity => {
            entity.update();
        });
    }
    setEntityInit(entityInit: EntityInit) {
        this.entityInit = entityInit;
    }
    initEntities(): void {
        this.entities.forEach(entity => {
            entity.init();
            this.entityInit?.setEntity(entity);
            this.entityInit?.notify();
        });
    }
    addEntity(entity: Entity) {
        this.entities.push(entity);
    }
    getComponents<T extends Component>(compCtor: new () => T) {
        return this.entities.filter(entity => entity.has(compCtor)).map(entity => entity.get(compCtor));
    }
}