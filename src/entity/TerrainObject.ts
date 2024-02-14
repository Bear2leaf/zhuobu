import { Component } from "./Entity.js";
import Node from "../transform/Node.js";
import TRS from "../transform/TRS.js";
import Entity from "./Entity.js";
import TerrainMesh from "../drawobject/TerrainMesh.js";

export default class TerrainObject extends Entity {
    addDefaultComponents(): void {
        [
            TRS,
            Node,
            TerrainMesh
        ].forEach(ctor => {
            this.add<Component>(ctor);
            
        });
    }
}