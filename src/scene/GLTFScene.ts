
import CameraControllerObject from "../entity/CameraControllerObject.js";
import Entity from "../entity/Entity.js";
import FlowersObject from "../entity/FlowersObject.js";
import HelloWireframeObject from "../entity/HelloWireframeObject.js";
import MeshObject from "../entity/MeshObject.js";
import PointerObject from "../entity/PointerObject.js";
import ReflectMapObject from "../entity/ReflectMapObject.js";
import RenderMapObject from "../entity/RenderMapObject.js";
import SkinMeshObject from "../entity/SkinMeshObject.js";
import SkyboxObject from "../entity/SkyboxObject.js";
import SpriteObject from "../entity/SpriteObject.js";
import WaterObject from "../entity/WaterObject.js";
import Scene from "./Scene.js";

export default class GLTFScene extends Scene {
    getDefaultEntities(): Entity[] {
        return [
            new CameraControllerObject()
            , new SkyboxObject()
            // , new FlowersObject()
            , new RenderMapObject()
            , new ReflectMapObject()
            , new WaterObject()
            , new SpriteObject()
            , new SkinMeshObject()
            , new MeshObject()
            , new PointerObject()
            , new HelloWireframeObject()
        ];
    }

}