import Entity from "../entity/Entity.js";
import MeshObject from "../entity/MeshObject.js";
import SkinMeshObject from "../entity/SkinMeshObject.js";
import Scene from "./Scene.js";
import SpriteObject from "../entity/SpriteObject.js";
import GasketObject from "../entity/GasketObject.js";
import TexturedCubeObject from "../entity/TexturedCubeObject.js";
import HelloWireframeObject from "../entity/HelloWireframeObject.js";
import HelloMultiMeshObject from "../entity/HelloMultiMeshObject.js";
import FlowersObject from "../entity/FlowersObject.js";
import CameraControllerObject from "../entity/CameraControllerObject.js";

export default class CameraControlScene extends Scene {
    getDefaultEntities(): Entity[] {
        return [
            new SpriteObject()
            , new FlowersObject()
            , new SkinMeshObject()
            , new MeshObject()
            , new GasketObject()
            , new TexturedCubeObject()
            , new HelloWireframeObject()
            , new HelloMultiMeshObject()
            , new CameraControllerObject()
        ];
    }

}