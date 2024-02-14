import { Component } from "./Entity.js";
import Node from "../transform/Node.js";
import TRS from "../transform/TRS.js";
import VisualizeCamera from "../wireframe/VisualizeCamera.js";
import FrustumCube from "../drawobject/FrustumCube.js";
import Entity from "./Entity.js";

export default class CameraObject extends Entity {
    addDefaultComponents(): void {
        [
            TRS,
            Node,
            FrustumCube,
            VisualizeCamera
        ].forEach(ctor => {
            this.add<Component>(ctor);
            
        });
    }
}