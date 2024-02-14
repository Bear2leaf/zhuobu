import { Component } from "./Entity.js";
import Node from "../transform/Node.js";
import TRS from "../transform/TRS.js";
import Entity from "./Entity.js";
import RenderMap from "../sprite/RenderMap.js";

export default class RenderMapObject extends Entity {
    addDefaultComponents(): void {
        [
            TRS,
            Node,
            RenderMap
        ].forEach(ctor => {
            this.add<Component>(ctor);
            
        });
    }
}