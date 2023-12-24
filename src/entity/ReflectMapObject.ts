import Component from "./Component.js";
import Node from "../transform/Node.js";
import TRS from "../transform/TRS.js";
import Entity from "./Entity.js";
import ReflectMap from "../sprite/ReflectMap.js";

export default class ReflectMapObject extends Entity {
    addDefaultComponents(): void {
        [
            TRS,
            Node,
            ReflectMap
        ].forEach(ctor => {
            this.add<Component>(ctor);
            
        });
    }
}