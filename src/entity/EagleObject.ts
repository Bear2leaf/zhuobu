import Component from "./Component.js";
import Node from "../transform/Node.js";
import TRS from "../transform/TRS.js";
import Entity from "./Entity.js";
import GLTFAnimationController from "../controller/GLTFAnimationController.js";
import EagleMesh from "../drawobject/EagleMesh.js";

export default class EagleObject extends Entity {
    addDefaultComponents(): void {
        [
            TRS,
            Node,
            EagleMesh,
            GLTFAnimationController,
        ].forEach(ctor => {
            this.add<Component>(ctor);
            
        });
    }
}