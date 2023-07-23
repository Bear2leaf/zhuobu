
import Entity from "../entity/Entity.js";
import FpsChartObject from "../entity/FpsChartObject.js";
import MeshObject from "../entity/MeshObject.js";
import PointerObject from "../entity/PointerObject.js";
import SkinMeshObject from "../entity/SkinMeshObject.js";
import SpriteObject from "../entity/SpriteObject.js";
import TextObject from "../entity/TextObject.js";
import Scene from "./Scene.js";

export default class DemoScene extends Scene {
    getDefaultEntities(): Entity[] {
        return [
            new SpriteObject()
            , new SkinMeshObject()
            , new MeshObject()
            , new PointerObject()
            , new TextObject()
            , new FpsChartObject()
        ];
    }

}