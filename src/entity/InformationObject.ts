import Component from "./Component.js";
import Node from "../transform/Node.js";
import TRS from "../transform/TRS.js";
import Entity from "./Entity.js";
import Border from "../drawobject/Border.js";
import InformationText from "../drawobject/InformationText.js";

export default class InformationObject extends Entity {
    addDefaultComponents(): void {
        [
            TRS,
            Node,
            InformationText,
            Border
        ].forEach(ctor => {
            this.add<Component>(ctor);
            
        });
    }
}