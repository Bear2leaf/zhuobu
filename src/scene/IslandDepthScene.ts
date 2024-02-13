
import Entity from "../entity/Entity.js";
import Scene from "./Scene.js";
import TerrainDepthObject from "../entity/TerrainDepthObject.js";

export default class IslandDepthScene extends Scene {
    getDefaultEntities(): Entity[] {
        return [
            new TerrainDepthObject()
        ];
    }

}