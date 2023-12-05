import Entity from "../entity/Entity.js";
import EntityAdd from "../subject/EntityAdd.js";
import EntityRegisterComponents from "../subject/EntityRegisterComponents.js";
import EntityRender from "../subject/EntityRender.js";
import EntitySubject from "../subject/EntitySubject.js";

export default abstract class Scene {
    private readonly entities: Entity[] = [];
    private entityInit?: EntitySubject;
    private entityAdd?: EntityAdd;
    private entityRegisterComponents?: EntityRegisterComponents;
    private entityRender?: EntityRender;
    abstract getDefaultEntities(): Entity[];
    registerEntities(): void {
        this.getDefaultEntities().forEach(entity => {
            this.addEntity(entity);
            this.entityAdd?.setEntity(entity);
            this.entityAdd?.notify();
        });
        this.entities.forEach(entity => {
            entity.registerComponents();
            this.entityRegisterComponents?.setEntity(entity);
            this.entityRegisterComponents?.notify();
        });
    }
    update(): void {
        this.entities.forEach(entity => {
            entity.update();
        });
    }
    render(): void {
        this.entities.forEach(entity => {
            this.entityRender?.setEntity(entity);
            this.entityRender?.notify();
        });
    }
    setEntitySubjects(
        entityInit: EntitySubject,
        entityAdd: EntityAdd,
        entityRegisterComponents: EntityRegisterComponents,
        entityRender: EntityRender
    ) {
        this.entityInit = entityInit;
        this.entityAdd = entityAdd;
        this.entityRegisterComponents = entityRegisterComponents;
        this.entityRender = entityRender;
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
}