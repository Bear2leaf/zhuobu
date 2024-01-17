import Component from "./Component.js";
import Node from "../transform/Node.js";
import TRS from "../transform/TRS.js";
import Entity from "./Entity.js";
import Message from "../drawobject/Message.js";
import Border from "../drawobject/Border.js";
import RestText from "../drawobject/RestText.js";

export default class RestButtonObject extends Entity {
    addDefaultComponents(): void {
        [
            TRS,
            Node,
            RestText,
            Border
        ].forEach(ctor => {
            this.add<Component>(ctor);
            
        });
    }
}