import Entity from "../entity/Entity.js";
import FpsChartObject from "../entity/FpsChartObject.js";
import FpsTextObject from "../entity/FpsTextObject.js";
import FramesTextObject from "../entity/FramesTextObject.js";
import PointerObject from "../entity/PointerObject.js";
import HelloWorldTextObject from "../entity/HelloWorldTextObject.js";
import Scene from "./Scene.js";

export default class TextScene extends Scene {
    getDefaultEntities(): Entity[] {
        return [
            new FpsChartObject()
            , new FpsTextObject()
            , new FramesTextObject()
            , new HelloWorldTextObject()
            , new PointerObject()
        ];
    }

}