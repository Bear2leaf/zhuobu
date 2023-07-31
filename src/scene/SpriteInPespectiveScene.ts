import Entity from "../entity/Entity.js";
import Sprite3dObject from "../entity/Sprite3dObject.js";
import Scene from "./Scene.js";

export default class SpriteInPespectiveScene extends Scene {
    getDefaultEntities(): Entity[] {
        return [
            new Sprite3dObject()
        ];
    }

}