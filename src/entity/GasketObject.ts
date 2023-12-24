import Component from "./Component.js";
import Node from "../transform/Node.js";
import TRS from "../transform/TRS.js";
import DrawObject from "../drawobject/DrawObject.js";
import Gasket from "../drawobject/Gasket.js";
import Entity from "./Entity.js";

export default class GasketObject extends Entity {
    addDefaultComponents(): void {
        [
            TRS,
            Node,
            Gasket
        ].forEach(ctor => {
            this.add<Component>(ctor);
            
        });
    }
}