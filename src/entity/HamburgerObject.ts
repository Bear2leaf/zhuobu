import Component from "./Component.js";
import Node from "../transform/Node.js";
import TRS from "../transform/TRS.js";
import Entity from "./Entity.js";
import Border from "../drawobject/Border.js";
import Hamburger from "../layout/Hamburger.js";

export default class HamburgerObject extends Entity {
    addDefaultComponents(): void {
        [
            TRS,
            Node,
            Hamburger,
            Border
        ].forEach(ctor => {
            this.add<Component>(ctor);
            
        });
    }
}