import Component from "./Component.js";
import Node from "../transform/Node.js";
import TRS from "../transform/TRS.js";
import DrawObject from "../drawobject/DrawObject.js";
import FramesText from "../drawobject/FramesText.js";
import Entity from "./Entity.js";

export default class FramesTextObject extends Entity {
    addDefaultComponents(): void {
        [
            TRS,
            Node,
            FramesText
        ].forEach(ctor => {
            this.add<Component>(ctor);
            
        });
    }
}