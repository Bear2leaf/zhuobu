import Entity from "../entity/Entity.js";
import RockObject from "../entity/RockObject.js";
import Scene from "./Scene.js";

export default class EnvironmentScene extends Scene {
    private readonly rocks: RockObject[] = [];
    getDefaultEntities(): Entity[] {
        return [
            new RockObject()
            , new RockObject()
            , new RockObject()
            , new RockObject()
            , new RockObject()
            , new RockObject()
            , new RockObject()
        ]
    }
    collectRefractDrawObject() {
        this.collectDrawObject()
    }
    collectReflectDrawObject() {
        this.collectDrawObject()
    }
    collectDepthDrawObject() {
        this.collectDrawObject()
    }

}