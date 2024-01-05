import Component from "./Component.js";
import Node from "../transform/Node.js";
import TRS from "../transform/TRS.js";
import Entity from "./Entity.js";
import Message from "../drawobject/Message.js";
import Border from "../drawobject/Border.js";

export default class MessageObject extends Entity {
    addDefaultComponents(): void {
        [
            TRS,
            Node,
            Message,
            Border
        ].forEach(ctor => {
            this.add<Component>(ctor);
            
        });
    }
}