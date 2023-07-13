import Entity from "../entity/Entity.js";
import PointerObject from "../entity/PointerObject.js";
import TextObject from "../entity/TextObject.js";
import Scene from "./Scene.js";

export default class TextScene extends Scene {
    getCtors(): Entity[] {
        return [
            new PointerObject()
            , new TextObject()
        ];
    }

}