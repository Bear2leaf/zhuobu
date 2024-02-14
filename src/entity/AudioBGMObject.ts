import { Component } from "./Entity.js";
import Node from "../transform/Node.js";
import TRS from "../transform/TRS.js";
import Entity from "./Entity.js";

export default class AudioBGMObject extends Entity {
    addDefaultComponents(): void {
        [
            TRS,
            Node,
        ].forEach(ctor => {
            this.add<Component>(ctor);
            
        });
    }
}