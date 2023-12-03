
import Entity from "../entity/Entity.js";
import MeshObject from "../entity/MeshObject.js";
import PointerObject from "../entity/PointerObject.js";
import SkinMeshObject from "../entity/SkinMeshObject.js";
import Scene from "./Scene.js";
import HelloWireframeObject from "../entity/HelloWireframeObject.js";
import AudioBGMObject from "../entity/AudioBGMObject.js";
import CameraControllerObject from "../entity/CameraControllerObject.js";
import SDFObject from "../entity/SDFObject.js";
import HeTextObject from "../entity/HeTextObject.js";
import SpriteObject from "../entity/SpriteObject.js";
import FlowersObject from "../entity/FlowersObject.js";

export default class DemoScene extends Scene {
    getDefaultEntities(): Entity[] {
        return [
            new SDFObject()
            , new FlowersObject()
            // , new CanvasObject()
            , new SpriteObject()
            // , new GasketObject()
            // , new TexturedCubeObject()
            , new MeshObject()
            , new SkinMeshObject()
            , new HelloWireframeObject()
            // , new HelloMultiMeshObject()
            // , new HelloWorldTextObject()
            , new HeTextObject()
            , new PointerObject()
            , new AudioBGMObject()
            , new CameraControllerObject()
        ];
    }

}