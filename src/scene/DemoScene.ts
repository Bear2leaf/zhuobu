
import NodeObject from "../entity/NodeObject.js";
import PointerObject from "../entity/PointerObject.js";
import SpriteObject from "../entity/SpriteObject.js";
import Scene from "./Scene.js";

export default class DemoScene extends Scene {
    registerEntities(): void {
        [   
            new NodeObject(),
            new NodeObject(),
            new SpriteObject(),
            new PointerObject()
        ].forEach(entity => this.addEntity(entity));
        this.getEntities().forEach(entity => entity.registerComponents());
    }
    initEntities(): void {
        this.getEntities().forEach(entity => entity.init());
    }

}