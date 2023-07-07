
import FpsChartObject from "../entity/FpsChartObject.js";
import MeshObject from "../entity/MeshObject.js";
import NodeObject from "../entity/NodeObject.js";
import PointerObject from "../entity/PointerObject.js";
import SkinMeshObject from "../entity/SkinMeshObject.js";
import SpriteObject from "../entity/SpriteObject.js";
import TextObject from "../entity/TextObject.js";
import Scene from "./Scene.js";

export default class DemoScene extends Scene {
    registerEntities(): void {
        [
            new NodeObject()
            , new NodeObject()
            , new SpriteObject()
            , new MeshObject()
            , new SkinMeshObject()
            , new PointerObject()
            , new TextObject()
            , new FpsChartObject()
        ].forEach(entity => this.addEntity(entity));
        this.getEntities().forEach(entity => entity.registerComponents());
    }
    initEntities(): void {
        this.getEntities().forEach(entity => entity.init());
    }

}