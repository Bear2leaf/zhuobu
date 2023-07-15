
import Entity from "../entity/Entity.js";
import HelloMeshObject from "../entity/HelloMeshObject.js";
import Scene from "./Scene.js";

export default class GLTFScene extends Scene {
    getCtors(): Entity[] {
        return [
            new HelloMeshObject()
        ];
    }

}