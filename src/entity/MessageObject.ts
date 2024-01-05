import Component from "./Component.js";
import Node from "../transform/Node.js";
import TRS from "../transform/TRS.js";
import Entity from "./Entity.js";
import Message from "../drawobject/Message.js";

export default class MessageObject extends Entity {
    addDefaultComponents(): void {
        [
            TRS,
            Node,
            Message
        ].forEach(ctor => {
            this.add<Component>(ctor);
            
        });
    }
}