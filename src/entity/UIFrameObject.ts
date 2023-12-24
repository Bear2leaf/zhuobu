import Component from "./Component.js";
import Node from "../transform/Node.js";
import TRS from "../transform/TRS.js";
import WireQuad from "../drawobject/WireQuad.js";
import Entity from "./Entity.js";
import UIFrame from "../wireframe/UIFrame.js";
import VisualizeCamera from "../wireframe/VisualizeCamera.js";

export default class UIFrameObject extends Entity {
    addDefaultComponents(): void {
        [
            TRS,
            Node,
            WireQuad,
            UIFrame,
            VisualizeCamera
        ].forEach(ctor => {
            this.add<Component>(ctor);
            
        });
    }
}