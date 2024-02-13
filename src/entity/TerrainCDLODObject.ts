import Component from "./Component.js";
import Node from "../transform/Node.js";
import TRS from "../transform/TRS.js";
import Entity from "./Entity.js";
import TerrainCDLOD from "../drawobject/TerrainCDLOD.js";

export default class TerrainCDLODObject extends Entity {
    addDefaultComponents(): void {
        [
            TRS,
            Node,
            TerrainCDLOD
        ].forEach(ctor => {
            this.add<Component>(ctor);
            
        });
    }
}