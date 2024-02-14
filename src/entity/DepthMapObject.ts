import { Component } from "./Entity.js";
import DepthMap from "../texturemap/DepthMap.js";
import Node from "../transform/Node.js";
import TRS from "../transform/TRS.js";
import Sprite from "../drawobject/Sprite.js";
import Entity from "./Entity.js";

export default class DepthMapObject extends Entity {
    addDefaultComponents(): void {
        [
            DepthMap,
            TRS,
            Node,
            Sprite
        ].forEach(ctor => {
            this.add<Component>(ctor);
            
        });
    }
}