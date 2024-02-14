import { Component } from "./Entity.js";
import Node from "../transform/Node.js";
import TRS from "../transform/TRS.js";
import VisualizeCamera from "../wireframe/VisualizeCamera.js";
import CameraCube from "../drawobject/CameraCube.js";
import Entity from "./Entity.js";

export default class CameraCubeObject extends Entity {
    addDefaultComponents(): void {
        [
            TRS,
            Node,
            CameraCube,
            VisualizeCamera
        ].forEach(ctor => {
            this.add<Component>(ctor);
            
        });
    }
}