import Component from "./Component.js";
import Node from "../transform/Node.js";
import FrontgroundFrame from "../wireframe/FrontgroundFrame.js";
import TRS from "../transform/TRS.js";
import DrawObject from "../drawobject/DrawObject.js";
import WireQuad from "../drawobject/WireQuad.js";
import Entity from "./Entity.js";
import VisualizeCamera from "../wireframe/VisualizeCamera.js";

export default class FrontgroundFrameObject extends Entity {
    registerComponents(): void {
        [
            TRS,
            Node,
            WireQuad,
            FrontgroundFrame,
            VisualizeCamera
        ].forEach(ctor => {
            this.add<Component>(ctor);
            this.get<Component>(ctor).setEntity(this);
        });
    }
}