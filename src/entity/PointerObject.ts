import Component from "./Component.js";
import Node from "../transform/Node.js";
import TRS from "../transform/TRS.js";
import Pointer from "../drawobject/Pointer.js";
import Entity from "./Entity.js";

export default class PointerObject extends Entity {
    addDefaultComponents(): void {
        [
            TRS,
            Node,
            Pointer,
        ].forEach(ctor => {
            this.add<Component>(ctor);
            
        });
    }
}