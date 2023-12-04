import Component from "./Component.js";
import Node from "../transform/Node.js";
import TRS from "../transform/TRS.js";
import Entity from "./Entity.js";
import AdrHeadText from "../drawobject/AdrHeadText.js";

export default class AdrHeadObject extends Entity {
    registerComponents(): void {
        [
            TRS,
            Node,
            AdrHeadText,
        ].forEach(ctor => {
            this.add<Component>(ctor);
            this.get<Component>(ctor).setEntity(this);
        });
    }
}