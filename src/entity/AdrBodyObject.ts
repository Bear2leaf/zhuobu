import Component from "./Component.js";
import Node from "../transform/Node.js";
import TRS from "../transform/TRS.js";
import Entity from "./Entity.js";
import AdrBodyText from "../drawobject/AdrBodyText.js";

export default class AdrBodyObject extends Entity {
    registerComponents(): void {
        [
            TRS,
            Node,
            AdrBodyText,
        ].forEach(ctor => {
            this.add<Component>(ctor);
            this.get<Component>(ctor).setEntity(this);
        });
    }
}