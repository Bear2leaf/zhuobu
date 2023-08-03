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
import SpriteObject from "../entity/SpriteObject.js";
import GasketObject from "../entity/GasketObject.js";
import TexturedCubeObject from "../entity/TexturedCubeObject.js";

export default class DebugScene extends Scene {
    getDefaultEntities(): Entity[] {
        return [
            new CameraObject()
            , new CameraCubeObject()
            , new CameraUpCubeObject()
            , new CameraLenConeObject()
            , new UIFrameObject()
            , new SpriteObject()
            , new FrontgroundFrameObject()
            , new BackgroundFrameObject()
            , new SkinMeshObject()
            , new MeshObject()
            , new GasketObject()
            , new TexturedCubeObject()
        ];
    }

}