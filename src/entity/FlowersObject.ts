import Component from "./Component.js";
import Flowers from "../texturemap/Flowers.js";
import Node from "../transform/Node.js";
import TRS from "../transform/TRS.js";
import DrawObject from "../drawobject/DrawObject.js";
import Sprite from "../drawobject/Sprite.js";
import Entity from "./Entity.js";

export default class FlowersObject extends Entity {
    registerComponents(): void {
        [
            TRS,
            Node,
            Sprite,
            Flowers
        ].forEach(ctor => {
            this.add<Component>(ctor);
            this.get<Component>(ctor).setEntity(this);
        });
    }
}