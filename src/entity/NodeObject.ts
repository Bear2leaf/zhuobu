import Component from "../component/Component.js";
import Node from "../transform/Node.js";
import TRS from "../transform/TRS.js";
import Entity from "./Entity.js";

export default class NodeObject extends Entity {
    registerComponents(): void {
        
        [
            TRS,
            Node
        ].forEach(ctor => {
            this.add<Component>(ctor);
            this.get<Component>(ctor).setEntity(this);
        });
    }
}