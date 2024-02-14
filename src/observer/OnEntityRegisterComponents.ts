import Entity from "../entity/Entity.js";
import EntityObserver from "./EntityObserver.js";

export default class OnEntityRegisterComponents extends EntityObserver {
    entity?: Entity;

    public notify(): void {
        const entity = this.entity!;
        entity.all().forEach((component) => {
            component.setEntity(entity);
        });

    }

}
