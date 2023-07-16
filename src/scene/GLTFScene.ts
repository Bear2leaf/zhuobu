
import Entity from "../entity/Entity.js";
import MeshObject from "../entity/MeshObject.js";
import SkinMeshObject from "../entity/SkinMeshObject.js";
import Scene from "./Scene.js";

export default class GLTFScene extends Scene {
    getDefaultEntities(): Entity[] {
        return [
            new SkinMeshObject()
            , new MeshObject()
        ];
    }

}