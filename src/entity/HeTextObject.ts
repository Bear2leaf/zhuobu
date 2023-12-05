import Component from "./Component.js";
import Node from "../transform/Node.js";
import TRS from "../transform/TRS.js";
import Entity from "./Entity.js";
import HeText from "../drawobject/HeText.js";

export default class HeTextObject extends Entity {
    registerComponents(): void {
        [
            TRS,
            Node,
            HeText
        ].forEach(ctor => {
            this.add<Component>(ctor);
            this.get<Component>(ctor).setEntity(this);
        });
    }
}