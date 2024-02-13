
import Entity from "../entity/Entity.js";
import MeshObject from "../entity/MeshObject.js";
import WhaleObject from "../entity/WhaleObject.js";
import SkyboxObject from "../entity/SkyboxObject.js";
import Scene from "./Scene.js";
import TerrainCDLODObject from "../entity/TerrainCDLODObject.js";

export default class IslandScene extends Scene {
    getDefaultEntities(): Entity[] {
        return [
            // new CameraControllerObject()
            // , new SkyboxObject()
            // , new WaterObject()
            new TerrainCDLODObject()
            // , new HelloWireframeObject()
        ];
    }
    collectRefractDrawObject() {
        this.collectDrawObject((entity) =>
            entity instanceof SkyboxObject
            || entity instanceof TerrainCDLODObject
            || entity instanceof WhaleObject
            || entity instanceof MeshObject
        )
    }
    collectReflectDrawObject() {
        this.collectDrawObject((entity) =>
            entity instanceof SkyboxObject
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