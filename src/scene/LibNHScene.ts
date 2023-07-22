import Entity from "../entity/Entity.js";
import TextObject from "../entity/TextObject.js";
import Scene from "./Scene.js";

export default class LibNHScene extends Scene {
    getDefaultEntities(): Entity[] {
        return [
            new TextObject()
        ];
    }

}