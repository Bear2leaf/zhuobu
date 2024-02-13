import Component from "./Component.js";
import Node from "../transform/Node.js";
import TRS from "../transform/TRS.js";
import Entity from "./Entity.js";
import TerrainMesh from "../drawobject/TerrainMesh.js";
import Terrain from "../drawobject/Terrain.js";

export default class TerrainObject extends Entity {
    addDefaultComponents(): void {
        [
            TRS,
            Node,
            Terrain
        ].forEach(ctor => {
            this.add<Component>(ctor);
            
        });
    }
}