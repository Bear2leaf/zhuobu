import Component from "./Component.js";
import Node from "../transform/Node.js";
import TRS from "../transform/TRS.js";
import Entity from "./Entity.js";
import ShipMesh from "../drawobject/ShipMesh.js";

export default class ShipObject extends Entity {
    addDefaultComponents(): void {
        [
            TRS,
            Node,
            ShipMesh,
            ShipMesh,
            ShipMesh,
            ShipMesh,
            ShipMesh,
        ].forEach(ctor => {
            this.add<Component>(ctor);
            
        });
    }
}