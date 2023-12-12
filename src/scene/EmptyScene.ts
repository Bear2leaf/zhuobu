
import Entity from "../entity/Entity.js";
import Scene from "./Scene.js";

export default class EmptyScene extends Scene {
    getDefaultEntities(): Entity[] {
        return [
        ];
    }

}