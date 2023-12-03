import Component from "./Component.js";
import Node from "../transform/Node.js";
import TRS from "../transform/TRS.js";
import DrawObject from "../drawobject/DrawObject.js";
import VisualizeCamera from "../wireframe/VisualizeCamera.js";
import FrustumCube from "../drawobject/FrustumCube.js";
import Entity from "./Entity.js";

export default class CameraObject extends Entity {
    registerComponents(): void {
        [
            TRS,
            Node,
            FrustumCube,
            VisualizeCamera
        ].forEach(ctor => {
            this.add<Component>(ctor);
            this.get<Component>(ctor).setEntity(this);
        });
    }
}