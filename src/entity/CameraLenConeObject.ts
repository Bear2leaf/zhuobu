import { Component } from "./Entity.js";
import Node from "../transform/Node.js";
import TRS from "../transform/TRS.js";
import VisualizeCamera from "../wireframe/VisualizeCamera.js";
import CameraLenCone from "../drawobject/CameraLenCone.js";
import Entity from "./Entity.js";

export default class CameraLenConeObject extends Entity {
    addDefaultComponents(): void {
        [
            TRS,
            Node,
            CameraLenCone,
            VisualizeCamera
        ].forEach(ctor => {
            this.add<Component>(ctor);
            
        });
    }
}