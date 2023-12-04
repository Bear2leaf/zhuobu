import Component from "./Component.js";
import Node from "../transform/Node.js";
import TRS from "../transform/TRS.js";
import HelloMultiMesh from "../drawobject/HelloMultiMesh.js";
import Entity from "./Entity.js";

export default class HelloMultiMeshObject extends Entity {
    registerComponents(): void {
        [
            TRS,
            Node,
            HelloMultiMesh,
        ].forEach(ctor => {
            this.add<Component>(ctor);
            this.get<Component>(ctor).setEntity(this);
        });
    }
}