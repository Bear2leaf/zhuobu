
import NodeObject from "../entity/NodeObject.js";
import SpriteObject from "../entity/SpriteObject.js";
import Scene from "./Scene";

export default class DemoScene extends Scene {
    init(): void {
        [   
            new NodeObject(),
            new NodeObject(),
            new SpriteObject()
        ].forEach(entity => this.addEntity(entity));
        super.init();
    }
}