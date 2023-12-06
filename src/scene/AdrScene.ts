
import Entity from "../entity/Entity.js";
import Scene from "./Scene.js";
import SpriteObject from "../entity/SpriteObject.js";
import FlowersObject from "../entity/FlowersObject.js";
import PointerObject from "../entity/PointerObject.js";
import HelloWireframeObject from "../entity/HelloWireframeObject.js";
import MeshObject from "../entity/MeshObject.js";
import SkinMeshObject from "../entity/SkinMeshObject.js";

export default class AdrScene extends Scene {
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