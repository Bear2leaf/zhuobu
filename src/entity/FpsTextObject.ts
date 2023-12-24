import Component from "./Component.js";
import Node from "../transform/Node.js";
import TRS from "../transform/TRS.js";
import DrawObject from "../drawobject/DrawObject.js";
import FpsText from "../drawobject/FpsText.js";
import Entity from "./Entity.js";

export default class FpsTextObject extends Entity {
    addDefaultComponents(): void {
        [
            TRS,
            Node,
            FpsText
        ].forEach(ctor => {
            this.add<Component>(ctor);
            
        });
    }
}