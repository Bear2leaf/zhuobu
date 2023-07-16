import Entity from "../entity/Entity.js";
import PointerObject from "../entity/PointerObject.js";
import Scene from "./Scene.js";

export default class TextDebugScene extends Scene {
    getDefaultEntities(): Entity[] {
        return [
            new PointerObject()
        ];
    }

}