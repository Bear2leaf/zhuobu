import Entity from "../entity/Entity.js";
import SpriteInPerspectiveObject from "../entity/SpriteInPerspectiveObject.js";
import Scene from "./Scene.js";

export default class SpriteInPespectiveScene extends Scene {
    getDefaultEntities(): Entity[] {
        return [
            new SpriteInPerspectiveObject()
        ];
    }

}