import Component from "./Component.js";
import Node from "../transform/Node.js";
import TRS from "../transform/TRS.js";
import Entity from "./Entity.js";
import EnvironmentMesh from "../drawobject/EnvironmentMesh.js";

export default class EnvironmentObject extends Entity {
    addDefaultComponents(): void {
        [
            TRS,
            Node,
            EnvironmentMesh
        ].forEach(ctor => {
            this.add<Component>(ctor);
            
        });
    }
}