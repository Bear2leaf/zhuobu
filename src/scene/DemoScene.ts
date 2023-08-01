
import Entity from "../entity/Entity.js";
import MeshObject from "../entity/MeshObject.js";
import PointerObject from "../entity/PointerObject.js";
import SkinMeshObject from "../entity/SkinMeshObject.js";
import SpriteObject from "../entity/SpriteObject.js";
import HelloWorldTextObject from "../entity/HelloWorldTextObject.js";
import Scene from "./Scene.js";

export default class DemoScene extends Scene {
    getDefaultEntities(): Entity[] {
        return [
            new SpriteObject()
            , new MeshObject()
            , new SkinMeshObject()
            , new HelloWorldTextObject()
            , new PointerObject()
        ];
    }

}