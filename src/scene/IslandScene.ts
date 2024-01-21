
import CameraControllerObject from "../entity/CameraControllerObject.js";
import Entity from "../entity/Entity.js";
import MeshObject from "../entity/MeshObject.js";
import WhaleObject from "../entity/WhaleObject.js";
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
        ];
    }
    collectRefractDrawObject() {
        this.collectDrawObject((entity) =>
            entity instanceof SkyboxObject
            || entity instanceof TerrianObject
            || entity instanceof WhaleObject
            || entity instanceof MeshObject
        )
    }
    collectReflectDrawObject() {
        this.collectDrawObject((entity) =>
            entity instanceof SkyboxObject
            || entity instanceof TerrianObject
            || entity instanceof WhaleObject
            || entity instanceof MeshObject
        )
    }
    collectDepthDrawObject() {
        this.collectDrawObject((entity) =>
            entity instanceof WhaleObject
            || entity instanceof MeshObject
        )
    }

}