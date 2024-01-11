
import SDFCharacter from "../drawobject/SDFCharacter.js";
import Entity from "../entity/Entity.js";
import FlowersObject from "../entity/FlowersObject.js";
import PointerObject from "../entity/PointerObject.js";
import ReflectMapObject from "../entity/ReflectMapObject.js";
import RenderMapObject from "../entity/RenderMapObject.js";
import SpriteObject from "../entity/SpriteObject.js";
import Scene from "./Scene.js";

export default class UIScene extends Scene {
    getDefaultEntities(): Entity[] {
        return [
            new RenderMapObject()
            , new ReflectMapObject()
            , new FlowersObject()
            , new PointerObject()
            , new SpriteObject()
        ];
    }
    collectPickDrawObject() {
        this.collectDrawObject((entity) =>
            entity instanceof SDFCharacter
            || false
        )
    }
}