import Component from "./Component.js";
import Node from "../transform/Node.js";
import TRS from "../transform/TRS.js";
import Entity from "./Entity.js";
import AdrText from "../drawobject/AdrText.js";

export default class AdrTextObject extends Entity {
    addDefaultComponents(): void {
        [
            TRS,
            Node,
            AdrText
        ].forEach(ctor => {
            this.add<Component>(ctor);
            
        });
    }
}