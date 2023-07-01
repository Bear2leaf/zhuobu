import Component from "../component/Component.js";
import Entity from "../entity/Entity.js";

export default abstract class Scene {
    private readonly entities: Entity[] = [];
    init(): void {
        this.entities.forEach(entity => entity.create());
    }
    update(): void {

        this.entities.forEach(element => {
            element.update();
        });
    }
    addEntity(entity: Entity) {
        this.entities.push(entity);
    }
    getComponents<T extends Component>(compCtor: new () => T) {
        return this.entities.filter(entity => entity.has(compCtor)).map(entity => entity.get(compCtor));
    }
}