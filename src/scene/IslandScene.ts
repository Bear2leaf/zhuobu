
import Entity from "../entity/Entity.js";
import MeshObject from "../entity/MeshObject.js";
import WhaleObject from "../entity/WhaleObject.js";
import SkyboxObject from "../entity/SkyboxObject.js";
import Scene from "./Scene.js";
import TerrainCDLODObject from "../entity/TerrainCDLODObject.js";
import CameraControllerObject from "../entity/CameraControllerObject.js";
import HelloWireframeObject from "../entity/HelloWireframeObject.js";
import WaterObject from "../entity/WaterObject.js";
import TerrainObject from "../entity/TerrainObject.js";
import SkyObject from "../entity/SkyObject.js";

export default class IslandScene extends Scene {
    getDefaultEntities(): Entity[] {
        return [
            new CameraControllerObject()
            , new WaterObject()
            , new SkyboxObject()
            // , new SkyObject()
            // , new TerrainObject()
            , new TerrainCDLODObject()
            , new HelloWireframeObject()
        ];
    }
    collectRefractDrawObject() {
        this.collectDrawObject((entity) =>
            entity instanceof SkyboxObject
            || entity instanceof TerrainObject
            || entity instanceof TerrainCDLODObject
            || entity instanceof WhaleObject
            || entity instanceof MeshObject
        )
    }
    collectReflectDrawObject() {
        this.collectDrawObject((entity) =>
            entity instanceof SkyboxObject
            || entity instanceof TerrainObject
            || entity instanceof TerrainCDLODObject
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