import Entity from "../entity/Entity.js";
import PointerObject from "../entity/PointerObject.js";
import SkinMeshObject from "../entity/SkinMeshObject.js";
import Scene from "./Scene.js";

export default class SkinMeshScene extends Scene {
    getCtors(): Entity[] {
        return [
            new SkinMeshObject()
            , new PointerObject()
        ];
    }

}