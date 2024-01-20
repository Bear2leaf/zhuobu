import EagleMesh from "../drawobject/EagleMesh.js";
import RockMesh from "../drawobject/RockMesh.js";
import WhaleMesh from "../drawobject/WhaleMesh.js";
import EagleObject from "../entity/EagleObject.js";
import Entity from "../entity/Entity.js";
import MeshObject from "../entity/MeshObject.js";
import RockObject from "../entity/RockObject.js";
import SkinMeshObject from "../entity/SkinMeshObject.js";
import Scene from "./Scene.js";

export default class EnvironmentScene extends Scene {
    private readonly rocks: RockObject[] = [
        new RockObject()
        , new RockObject()
        , new RockObject()
        , new RockObject()
        , new RockObject()
        , new RockObject()
        , new RockObject()
    ];
    private readonly eagles: EagleObject[] = [
        new EagleObject()
    ]
    private readonly whales: [MeshObject, SkinMeshObject] =
        [
            new MeshObject()
            , new SkinMeshObject()
        ]
    private visibleRocksNumber = this.rocks.length;
    private currentVisibleRocksNumber = 0;
    private showEagle = false;
    private showWhales = false;
    getDefaultEntities(): Entity[] {
        return [
            ...this.rocks,
            ...this.eagles,
            ...this.whales
        ];
    }
    collectDrawObject(): void {
        super.collectDrawObject(entity => this.getEntityFilterRule(entity));
    }
    getEntityFilterRule(entity: Entity) {
        if (entity.has(RockMesh)) {
            return this.rocks.indexOf(entity) < this.currentVisibleRocksNumber;
        } else if (entity.has(EagleMesh)) {
            return this.showEagle;
        } else if (entity.has(WhaleMesh)) {
            return this.showWhales;
        }
        return true
    }
    setVisibleRocksNumber(num: number) {
        this.visibleRocksNumber = num;
    }
    setEagleVisible(show: boolean) {
        this.showEagle = show;
    }
    setWhalesVisible(show: boolean) {
        this.showWhales = show;
    }
    updateResourceProgress(progress: number) {
        this.currentVisibleRocksNumber = this.visibleRocksNumber * progress;
    }

}