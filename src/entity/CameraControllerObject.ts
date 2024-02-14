import { Component } from "./Entity.js";
import Node from "../transform/Node.js";
import TRS from "../transform/TRS.js";
import Entity from "./Entity.js";
import CameraController from "../controller/CameraController.js";

export default class CameraControllerObject extends Entity {
    addDefaultComponents(): void {
        [
            TRS,
            Node,
            CameraController,
        ].forEach(ctor => {
            this.add<Component>(ctor);
            
        });
    }
}