
import Entity from "../entity/Entity.js";
import MeshObject from "../entity/MeshObject.js";
import PointerObject from "../entity/PointerObject.js";
import SkinMeshObject from "../entity/SkinMeshObject.js";
import SpriteObject from "../entity/SpriteObject.js";
import HelloWorldTextObject from "../entity/HelloWorldTextObject.js";
import Scene from "./Scene.js";
import GasketObject from "../entity/GasketObject.js";
import TexturedCubeObject from "../entity/TexturedCubeObject.js";
import HelloMeshObject from "../entity/HelloMeshObject.js";
import HelloMultiMeshObject from "../entity/HelloMultiMeshObject.js";

export default class DemoScene extends Scene {
    getDefaultEntities(): Entity[] {
        return [
            new SpriteObject()
            , new GasketObject()
            , new TexturedCubeObject()
            , new MeshObject()
            , new SkinMeshObject()
            , new HelloWorldTextObject()
            , new PointerObject()
            , new HelloMeshObject()
            , new HelloMultiMeshObject()
        ];
    }

}