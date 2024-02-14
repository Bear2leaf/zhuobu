import { Component } from "./Entity.js";
import Node from "../transform/Node.js";
import TRS from "../transform/TRS.js";
import DrawObject from "../drawobject/DrawObject.js";
import Histogram from "../drawobject/Histogram.js";
import Entity from "./Entity.js";

export default class FpsChartObject extends Entity {
    addDefaultComponents(): void {
        [
            TRS,
            Node,
            Histogram
        ].forEach(ctor => {
            this.add<Component>(ctor);
            
        });
    }
}