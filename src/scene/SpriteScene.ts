import Entity from "../entity/Entity.js";
import PointerObject from "../entity/PointerObject.js";
import SpriteObject from "../entity/SpriteObject.js";
import Scene from "./Scene.js";

export default class SpriteScene extends Scene {
    getCtors(): Entity[] {
        return [
            new SpriteObject()
            , new PointerObject()];
    }

}