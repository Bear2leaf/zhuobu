import { Component } from "./Entity.js";
import Node from "../transform/Node.js";
import TRS from "../transform/TRS.js";
import Entity from "./Entity.js";
import RockMesh from "../drawobject/RockMesh.js";

export default class RockObject extends Entity {
    addDefaultComponents(): void {
        [
            TRS,
            Node,
            RockMesh,
        ].forEach(ctor => {
            this.add<Component>(ctor);
            
        });
    }
}