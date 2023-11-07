
import Entity from "../entity/Entity.js";
import MeshObject from "../entity/MeshObject.js";
import PointerObject from "../entity/PointerObject.js";
import SkinMeshObject from "../entity/SkinMeshObject.js";
import SpriteObject from "../entity/SpriteObject.js";
import HelloWorldTextObject from "../entity/HelloWorldTextObject.js";
import Scene from "./Scene.js";
import GasketObject from "../entity/GasketObject.js";
import TexturedCubeObject from "../entity/TexturedCubeObject.js";
import HelloWireframeObject from "../entity/HelloWireframeObject.js";
import HelloMultiMeshObject from "../entity/HelloMultiMeshObject.js";
import FlowersObject from "../entity/FlowersObject.js";
import AudioBGMObject from "../entity/AudioBGMObject.js";
import CameraControllerObject from "../entity/CameraControllerObject.js";
import CanvasObject from "../entity/CanvasObject.js";
import SDFObject from "../entity/SDFObject.js";
import HeTextObject from "../entity/HeTextObject.js";

export default class DemoScene extends Scene {
    getDefaultEntities(): Entity[] {
        return [
            new FlowersObject()
            , new CanvasObject()
            , new SDFObject()
            , new SpriteObject()
            , new GasketObject()
            , new TexturedCubeObject()
            , new MeshObject()
            , new SkinMeshObject()
            , new HelloWireframeObject()
            , new HelloMultiMeshObject()
            , new HelloWorldTextObject()
            , new HeTextObject()
            , new PointerObject()
            , new AudioBGMObject()
            , new CameraControllerObject()
        ];
    }

}