import Entity from "../entity/Entity.js";
import FlowersObject from "../entity/FlowersObject.js";
import PointerObject from "../entity/PointerObject.js";
import SpriteObject from "../entity/SpriteObject.js";
import Scene from "./Scene.js";

export default class SpriteScene extends Scene {
    getDefaultEntities(): Entity[] {
        return [
            new SpriteObject()
            , new FlowersObject()
            , new PointerObject()
        ];
    }

}