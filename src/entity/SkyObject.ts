import Component from "./Component.js";
import Node from "../transform/Node.js";
import TRS from "../transform/TRS.js";
import Entity from "./Entity.js";
import Sky from "../drawobject/Sky.js";

export default class SkyObject extends Entity {
    addDefaultComponents(): void {
        [
            TRS,
            Node,
            Sky
        ].forEach(ctor => {
            this.add<Component>(ctor);
            
        });
    }
}