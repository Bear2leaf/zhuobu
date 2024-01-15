import Component from "./Component.js";
import Node from "../transform/Node.js";
import TRS from "../transform/TRS.js";
import Entity from "./Entity.js";
import TerrianMesh from "../drawobject/TerrianMesh.js";

export default class TerrianObject extends Entity {
    addDefaultComponents(): void {
        [
            TRS,
            Node,
            TerrianMesh
        ].forEach(ctor => {
            this.add<Component>(ctor);
            
        });
    }
}