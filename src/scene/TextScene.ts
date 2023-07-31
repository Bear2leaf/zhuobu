import Entity from "../entity/Entity.js";
import FpsChartObject from "../entity/FpsChartObject.js";
import FpsTextObject from "../entity/FpsTextObject.js";
import FramesTextObject from "../entity/FramesTextObject.js";
import PointerObject from "../entity/PointerObject.js";
import TextObject from "../entity/TextObject.js";
import Scene from "./Scene.js";

export default class TextScene extends Scene {
    getDefaultEntities(): Entity[] {
        return [
            new FpsChartObject()
            , new FpsTextObject()
            , new FramesTextObject()
            , new TextObject()
            , new PointerObject()
        ];
    }

}