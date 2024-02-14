import DrawObject from "../drawobject/DrawObject.js";
import Entity from "../entity/Entity.js";
import EntityObserver from "./EntityObserver.js";

export default class OnEntityRender extends EntityObserver {
    renderEntity?: (entity: Entity) => void;
    public notify(): void {
        const entity = this.entity!;
        if (entity.has(DrawObject)) {
            this.renderEntity!(entity);
        }
    }

}
