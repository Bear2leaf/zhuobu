
import Entity from "../entity/Entity.js";
import FlowersObject from "../entity/FlowersObject.js";
import HelloWireframeObject from "../entity/HelloWireframeObject.js";
import MeshObject from "../entity/MeshObject.js";
import PointerObject from "../entity/PointerObject.js";
import SkinMeshObject from "../entity/SkinMeshObject.js";
import SpriteObject from "../entity/SpriteObject.js";
import Scene from "./Scene.js";

export default class GLTFScene extends Scene {
    getDefaultEntities(): Entity[] {
        return [
            new FlowersObject()
            , new SpriteObject() 
            , new SkinMeshObject()
            , new MeshObject()
            , new HelloWireframeObject()
            , new PointerObject()
        ];
    }

}