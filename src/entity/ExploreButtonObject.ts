import { Component } from "./Entity.js";
import Node from "../transform/Node.js";
import TRS from "../transform/TRS.js";
import Entity from "./Entity.js";
import Border from "../drawobject/Border.js";
import ExploreText from "../drawobject/ExploreText.js";

export default class ExploreButtonObject extends Entity {
    addDefaultComponents(): void {
        [
            TRS,
            Node,
            ExploreText,
            Border
        ].forEach(ctor => {
            this.add<Component>(ctor);
            
        });
    }
}