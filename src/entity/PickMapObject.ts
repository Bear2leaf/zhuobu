import Component from "./Component.js";
import Node from "../transform/Node.js";
import PickMap from "../texturemap/PickMap.js";
import TRS from "../transform/TRS.js";
import DrawObject from "../drawobject/DrawObject.js";
import Sprite from "../drawobject/Sprite.js";
import Entity from "./Entity.js";

export default class PickMapObject extends Entity {
    registerComponents(): void {
        [
            PickMap,
            TRS,
            Node,
            Sprite
        ].forEach(ctor => {
            this.add<Component>(ctor);
            this.get<Component>(ctor).setEntity(this);
        });
    }
}