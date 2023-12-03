import Component from "./Component.js";
import Flowers from "../sprite/Flowers.js";
import Node from "../transform/Node.js";
import TRS from "../transform/TRS.js";
import Entity from "./Entity.js";

export default class FlowersObject extends Entity {
    registerComponents(): void {
        [
            TRS,
            Node,
            Flowers
        ].forEach(ctor => {
            this.add<Component>(ctor);
            this.get<Component>(ctor).setEntity(this);
        });
    }
}