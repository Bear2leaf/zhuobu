
import CameraCubeObject from "../entity/CameraCubeObject.js";
import CameraLenConeObject from "../entity/CameraLenConeObject.js";
import CameraObject from "../entity/CameraObject.js";
import CameraUpCubeObject from "../entity/CameraUpCubeObject.js";
import Entity from "../entity/Entity.js";
import MeshObject from "../entity/MeshObject.js";
import SkinMeshObject from "../entity/SkinMeshObject.js";
import Scene from "./Scene.js";

export default class TestGLTFScene extends Scene {
    getDefaultEntities(): Entity[] {
        return [
            new SkinMeshObject()
            , new MeshObject()
            , new CameraObject()
            , new CameraCubeObject()
            , new CameraUpCubeObject()
            , new CameraLenConeObject()
        ];
    }

}