import Entity from "../entity/Entity.js";
import EntityAdd from "../subject/EntityAdd.js";
import EntityRegisterComponents from "../subject/EntityRegisterComponents.js";
import EntityRemove from "../subject/EntityRemove.js";
import EntityRender from "../subject/EntityRender.js";
import EntitySubject from "../subject/EntitySubject.js";
import EntityUpdate from "../subject/EntityUpdate.js";

export default abstract class Scene {
    private readonly entities: Entity[] = [];
    private entityInit?: EntitySubject;
    private entityAdd?: EntityAdd;
    private entityRemove?: EntityRemove;
    private entityRegisterComponents?: EntityRegisterComponents;
    private entityRender?: EntityRender;
    private entityUpdate?: EntityUpdate;
    abstract getDefaultEntities(): Entity[];

    registerEntities(): void {
        this.getDefaultEntities().forEach(entity => {
            this.addEntity(entity);
            entity.addDefaultComponents();
            this.registerComponents(entity);
        });
    }
    update(): void {
        this.entities.forEach(entity => {
            this.entityUpdate?.setEntity(entity);
            this.entityUpdate?.notify();
        });
    }
    collectDrawObject(filter?: (entity: Entity) => boolean): void {
        this.entities.filter(filter ? filter : () => true).forEach(entity => {
            this.entityRender?.setEntity(entity);
            this.entityRender?.notify();
        });
    }
    setEntitySubjects(
        entityInit: EntitySubject,
        entityAdd: EntityAdd,
        entityRegisterComponents: EntityRegisterComponents,
        entityRender: EntityRender,
        entityUpdate: EntityUpdate,
        entityRemove: EntityRemove
    ) {
        this.entityInit = entityInit;
        this.entityAdd = entityAdd;
        this.entityRegisterComponents = entityRegisterComponents;
        this.entityRender = entityRender;
        this.entityUpdate = entityUpdate;
        this.entityRemove = entityRemove;
    }
    initEntities(): void {
        this.entities.forEach(entity => {
            this.initEntity(entity);
        });
    }
    addEntity(entity: Entity) {
        const index = this.entities.indexOf(entity);
        if (index === -1) {
            this.entities.push(entity);
            this.entityAdd?.setEntity(entity);
            this.entityAdd?.notify();
        }
    }
    removeEntity(entity: Entity) {
        const index = this.entities.indexOf(entity);
        if (index !== -1) {
            this.entities.splice(index, 1);
            this.entityRemove?.setEntity(entity);
            this.entityRemove?.notify();
        }
    }
    registerComponents(entity: Entity) {
        this.entityRegisterComponents?.setEntity(entity);
        this.entityRegisterComponents?.notify();
    }
    initEntity(entity: Entity) {
        this.entityInit?.setEntity(entity);
        this.entityInit?.notify();
    }
}