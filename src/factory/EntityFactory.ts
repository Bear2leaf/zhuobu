import PositionWithChildren from "../entity/PositionWithChildren.js";
import FactoryManager from "../manager/FactoryManager.js";
import Factory from "./Factory.js";

export default class EntityFactory implements Factory {
    constructor(private readonly factoryManager: FactoryManager) {

    }
    createDefaultEntity() {
        const entity = new PositionWithChildren();
        return entity;
    }
}