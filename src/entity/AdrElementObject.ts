import Component from "./Component.js";
import Node from "../transform/Node.js";
import TRS from "../transform/TRS.js";
import Entity from "./Entity.js";
import AdrElementText from "../drawobject/AdrElementText.js";

export default class AdrElementObject extends Entity {
    registerComponents(): void {
        [
            TRS,
            Node,
            AdrElementText,
        ].forEach(ctor => {
            this.add<Component>(ctor);
            this.get<Component>(ctor).setEntity(this);
        });
    }
}