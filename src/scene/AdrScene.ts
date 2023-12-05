
import Entity from "../entity/Entity.js";
import Scene from "./Scene.js";
import SpriteObject from "../entity/SpriteObject.js";
import FlowersObject from "../entity/FlowersObject.js";
import AdrBodyObject from "../entity/AdrBodyObject.js";
import AdrHeadObject from "../entity/AdrHeadObject.js";
import AdrRootObject from "../entity/AdrRootObject.js";
import PointerObject from "../entity/PointerObject.js";
import HelloWireframeObject from "../entity/HelloWireframeObject.js";
import MeshObject from "../entity/MeshObject.js";
import SkinMeshObject from "../entity/SkinMeshObject.js";

export default class AdrScene extends Scene {
    getDefaultEntities(): Entity[] {
        return [
            new FlowersObject()
            , new SpriteObject() 
            , new HelloWireframeObject()
            , new MeshObject()
            , new SkinMeshObject()
            , new AdrRootObject()
            , new AdrHeadObject()
            , new AdrBodyObject()
            , new PointerObject()
        ];
    }

}