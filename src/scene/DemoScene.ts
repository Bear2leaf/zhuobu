
import Entity from "../entity/Entity.js";
import NodeObject from "../entity/NodeObject.js";
import SpriteObject from "../entity/SpriteObject.js";
import Scene from "./Scene";

export default class DemoScene implements Scene {
    private readonly entities: Entity[] = [];
    init(): void {
        [   
            new NodeObject(),
            new NodeObject(),
            new SpriteObject()
        ].forEach(entity => this.entities.push(entity));
        this.entities.forEach(entity => entity.create());
    }
}