import Component from "./Component.js";
import Node from "../transform/Node.js";
import TRS from "../transform/TRS.js";
import WhaleMesh from "../drawobject/WhaleMesh.js";
import Entity from "./Entity.js";

export default class MeshObject extends Entity {
    addDefaultComponents(): void {
        [
            TRS,
            Node,
            WhaleMesh,
        ].forEach(ctor => {
            this.add<Component>(ctor);
            
        });
    }
}