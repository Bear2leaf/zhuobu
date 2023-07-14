import Entity from "../entity/Entity.js";
import FpsTextObject from "../entity/FpsTextObject.js";
import FramesTextObject from "../entity/FramesTextObject.js";
import PointerObject from "../entity/PointerObject.js";
import Scene from "./Scene.js";

export default class TextDebugScene extends Scene {
    getCtors(): Entity[] {
        return [
            new PointerObject()
            , new FpsTextObject()
            , new FramesTextObject()
        ];
    }

}