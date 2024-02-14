import BackgroundFrame from "../wireframe/BackgroundFrame.js";
import { Component } from "./Entity.js";
import DrawObject from "../drawobject/DrawObject.js";
import Node from "../transform/Node.js";
import TRS from "../transform/TRS.js";
import VisualizeCamera from "../wireframe/VisualizeCamera.js";
import WireQuad from "../drawobject/WireQuad.js";
import { LineRenderer } from "../renderer/LineRenderer.js";
import Entity from "./Entity.js";

export default class BackgroundFrameObject extends Entity {
    addDefaultComponents(): void {
        [
            TRS,
            Node,
            WireQuad,
            BackgroundFrame,
            VisualizeCamera
        ].forEach(ctor => {
            this.add<Component>(ctor);
            
        });
    }
}