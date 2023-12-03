import Component from "./Component.js";
import Node from "../transform/Node.js";
import TRS from "../transform/TRS.js";
import DrawObject from "../drawobject/DrawObject.js";
import Histogram from "../drawobject/Histogram.js";
import Entity from "./Entity.js";

export default class FpsChartObject extends Entity {
    registerComponents(): void {
        [
            TRS,
            Node,
            Histogram
        ].forEach(ctor => {
            this.add<Component>(ctor);
            this.get<Component>(ctor).setEntity(this);
        });
    }
}