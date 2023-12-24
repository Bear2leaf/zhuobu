import Component from "./Component.js";
import Node from "../transform/Node.js";
import TRS from "../transform/TRS.js";
import WhaleMesh from "../drawobject/WhaleMesh.js";
import Entity from "./Entity.js";
import GLTFAnimationController from "../controller/GLTFAnimationController.js";

export default class SkinMeshObject extends Entity {
    addDefaultComponents(): void {
        [
            TRS,
            Node,
            WhaleMesh,
            GLTFAnimationController,
        ].forEach(ctor => {
            this.add<Component>(ctor);
            
        });
    }
}