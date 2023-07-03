import Component from "../component/Component.js";
import Entity from "../entity/Entity.js";

export default abstract class Scene {
    private readonly entities: Entity[] = [];
    update(): void {
        this.entities.forEach(element => {
            element.update();
        });
    }
    addEntity(entity: Entity) {
        this.entities.push(entity);
    }
    getEntities() {
        return this.entities;
    }
    getComponents<T extends Component>(compCtor: new () => T) {
        return this.entities.filter(entity => entity.has(compCtor)).map(entity => entity.get(compCtor));
    }
}