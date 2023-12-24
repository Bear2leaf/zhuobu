import Component from "./Component.js";
import Node from "../transform/Node.js";
import TRS from "../transform/TRS.js";
import HelloWireframe from "../drawobject/HelloWireframe.js";
import Entity from "./Entity.js";
import GLTFAnimationController from "../controller/GLTFAnimationController.js";

export default class HelloWireframeObject extends Entity {
    addDefaultComponents(): void {
        [
            TRS,
            Node,
            HelloWireframe,
            GLTFAnimationController
        ].forEach(ctor => {
            this.add<Component>(ctor);
            
        });
    }
}