import Entity from "../entity/Entity.js";
import MeshObject from "../entity/MeshObject.js";
import PointerObject from "../entity/PointerObject.js";
import Scene from "./Scene.js";

export default class MeshScene extends Scene {
    getDefaultEntities(): Entity[] {
        return [
            new MeshObject()
            , new PointerObject()
        ];
    }

}