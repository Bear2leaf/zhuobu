import { Component } from "./Entity.js";
import Node from "../transform/Node.js";
import TRS from "../transform/TRS.js";
import Entity from "./Entity.js";
import Water from "../sprite/Water.js";

export default class WaterObject extends Entity {
    addDefaultComponents(): void {
        [
            TRS,
            Node,
            Water
        ].forEach(ctor => {
            this.add<Component>(ctor);
            
        });
    }
}