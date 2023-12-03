import Component from "./Component.js";
import Node from "../transform/Node.js";
import TRS from "../transform/TRS.js";
import DrawObject from "../drawobject/DrawObject.js";
import Sprite from "../drawobject/Sprite.js";
import Entity from "./Entity.js";
import SDFCanvasMap from "../texturemap/SDFCanvasMap.js";

export default class SDFObject extends Entity {
    registerComponents(): void {
        [
            TRS,
            Node,
            Sprite,
            SDFCanvasMap
        ].forEach(ctor => {
            this.add<Component>(ctor);
            this.get<Component>(ctor).setEntity(this);
        });
    }
}