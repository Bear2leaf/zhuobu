import Component from "./Component.js";
import Node from "../transform/Node.js";
import TRS from "../transform/TRS.js";
import Entity from "./Entity.js";
import AdrRoot from "../drawobject/AdrRoot.js";

export default class AdrRootObject extends Entity {
    registerComponents(): void {
        [
            TRS,
            Node,
            AdrRoot
        ].forEach(ctor => {
            this.add<Component>(ctor);
            this.get<Component>(ctor).setEntity(this);
        });
    }
}