
import CameraControllerObject from "../entity/CameraControllerObject.js";
import EagleObject from "../entity/EagleObject.js";
import Entity from "../entity/Entity.js";
import HelloMultiMeshObject from "../entity/HelloMultiMeshObject.js";
import MeshObject from "../entity/MeshObject.js";
import SkinMeshObject from "../entity/SkinMeshObject.js";
import SkyboxObject from "../entity/SkyboxObject.js";
import TerrianObject from "../entity/TerrianObject.js";
import WaterObject from "../entity/WaterObject.js";
import Scene from "./Scene.js";

export default class IslandScene extends Scene {
    getDefaultEntities(): Entity[] {
        return [
            new CameraControllerObject()
            , new SkyboxObject()
            , new WaterObject()
            , new TerrianObject()
            , new MeshObject()
            , new SkinMeshObject()
        ];
    }
    collectRefractDrawObject() {
        this.collectDrawObject((entity) =>
            entity instanceof SkyboxObject
            || entity instanceof TerrianObject
            || entity instanceof SkinMeshObject
            || entity instanceof MeshObject
        )
    }
    collectReflectDrawObject() {
        this.collectDrawObject((entity) =>
            entity instanceof SkyboxObject
            || entity instanceof TerrianObject
            || entity instanceof SkinMeshObject
            || entity instanceof MeshObject
        )
    }
    collectDepthDrawObject() {
        this.collectDrawObject((entity) =>
            entity instanceof SkinMeshObject
            || entity instanceof MeshObject
        )
    }

}