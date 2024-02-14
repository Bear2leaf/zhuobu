import AnimationController from "../controller/AnimationController.js";
import Mesh from "../drawobject/Mesh.js";
import Pointer from "../drawobject/Pointer.js";
import DrawObject from "../drawobject/DrawObject.js";
import TerrainMesh from "../drawobject/TerrainMesh.js";
import Entity from "../entity/Entity.js";
import EntityObserver from "./EntityObserver.js";

export default class OnEntityUpdate extends EntityObserver {
    entity?: Entity;
    updateTerrainMesh?: (terrainMesh: TerrainMesh) => void;
    animateEntity?: (animateEntity: Entity) => void;
    public notify(): void {
        const entity = this.entity!;
        if (entity.has(Mesh)) {
            entity.all(Mesh).forEach(mesh => mesh.update());
        }
        if (entity.has(AnimationController)) {
            entity.get(AnimationController).update();
            this.animateEntity!(entity);
        }
        if (entity.has(TerrainMesh)) {
            this.updateTerrainMesh!(entity.get(TerrainMesh))
        }
        if (entity.has(Pointer)) {
            entity.get(Pointer).update();
        }
        if (entity.has(DrawObject)) {
            entity.all(DrawObject).forEach(drawobject => drawobject.updateModel());
        }
    }

}
