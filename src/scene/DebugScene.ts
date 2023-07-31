import CameraCubeObject from "../entity/CameraCubeObject.js";
import CameraLenConeObject from "../entity/CameraLenConeObject.js";
import CameraObject from "../entity/CameraObject.js";
import CameraUpCubeObject from "../entity/CameraUpCubeObject.js";
import Entity from "../entity/Entity.js";
import MeshObject from "../entity/MeshObject.js";
import SkinMeshObject from "../entity/SkinMeshObject.js";
import BackgroundFrameObject from "../entity/BackgroundFrameObject.js";
import FrontgroundFrameObject from "../entity/FrontgroundFrameObject.js";
import Scene from "./Scene.js";
import UIFrameObject from "../entity/UIFrameObject.js";
import Sprite3dObject from "../entity/Sprite3dObject.js";

export default class DebugScene extends Scene {
    getDefaultEntities(): Entity[] {
        return [
            new CameraObject()
            , new CameraCubeObject()
            , new CameraUpCubeObject()
            , new CameraLenConeObject()
            , new UIFrameObject()
            , new Sprite3dObject()
            , new FrontgroundFrameObject()
            , new BackgroundFrameObject()
            , new SkinMeshObject()
            , new MeshObject()
        ];
    }

}