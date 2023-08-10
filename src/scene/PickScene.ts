import Entity from "../entity/Entity.js";
import PickMapObject from "../entity/PickMapObject.js";
import Scene from "./Scene.js";

export default class PickScene extends Scene {
    getDefaultEntities(): Entity[] {
        return [
            new PickMapObject()
        ];
    }

}