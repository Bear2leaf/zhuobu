import EagleObject from "../entity/EagleObject.js";
import Entity from "../entity/Entity.js";
import RockObject from "../entity/RockObject.js";
import Scene from "./Scene.js";

export default class EnvironmentScene extends Scene {
    private readonly rocks: RockObject[] = [
        new RockObject()
        , new RockObject()
        , new RockObject()
        , new RockObject()
        , new RockObject()
        , new RockObject()
        , new RockObject()
    ];
    private readonly eagles: EagleObject[] = [
        new EagleObject()
    ]
    getDefaultEntities(): Entity[] {
        return [
            ...this.rocks,
            ...this.eagles
        ];
    }
    getRocks(): RockObject[] {
        return this.rocks;
    }

}