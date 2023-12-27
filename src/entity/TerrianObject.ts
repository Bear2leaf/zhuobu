import Component from "./Component.js";
import Node from "../transform/Node.js";
import TRS from "../transform/TRS.js";
import Entity from "./Entity.js";
import Terrian from "../drawobject/Terrian.js";

export default class TerrianObject extends Entity {
    addDefaultComponents(): void {
        [
            TRS,
            Node,
            Terrian
        ].forEach(ctor => {
            this.add<Component>(ctor);
            
        });
    }
}