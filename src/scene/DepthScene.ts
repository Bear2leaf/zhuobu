import DepthMapObject from "../entity/DepthMapObject.js";
import Entity from "../entity/Entity.js";
import Scene from "./Scene.js";

export default class DepthScene extends Scene {
    getDefaultEntities(): Entity[] {
        return [
            new DepthMapObject()
        ];
    }

}