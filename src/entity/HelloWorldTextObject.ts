import Component from "./Component.js";
import Node from "../transform/Node.js";
import TRS from "../transform/TRS.js";
import DrawObject from "../drawobject/DrawObject.js";
import HelloWorldText from "../drawobject/HelloWorldText.js";
import Entity from "./Entity.js";

export default class HelloWorldTextObject extends Entity {
    registerComponents(): void {
        [
            TRS,
            Node,
            HelloWorldText
        ].forEach(ctor => {
            this.add<Component>(ctor);
            this.get<Component>(ctor).setEntity(this);
        });
    }
}