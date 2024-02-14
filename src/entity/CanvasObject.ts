import { Component } from "./Entity.js";
import Node from "../transform/Node.js";
import TRS from "../transform/TRS.js";
import Sprite from "../drawobject/Sprite.js";
import Entity from "./Entity.js";
import SingleColorCanvasMap from "../texturemap/SingleColorCanvasMap.js";

export default class CanvasObject extends Entity {
    addDefaultComponents(): void {
        [
            TRS,
            Node,
            Sprite,
            SingleColorCanvasMap
        ].forEach(ctor => {
            this.add<Component>(ctor);
            
        });
    }
}