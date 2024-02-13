import Component from "./Component.js";
import Node from "../transform/Node.js";
import TRS from "../transform/TRS.js";
import Entity from "./Entity.js";
import TerrainDepth from "../drawobject/TerrainDepth.js";

export default class TerrainDepthObject extends Entity {
    addDefaultComponents(): void {
        [
            TRS,
            Node,
            TerrainDepth
        ].forEach(ctor => {
            this.add<Component>(ctor);
            
        });
    }
}