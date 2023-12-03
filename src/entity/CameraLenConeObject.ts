import Component from "./Component.js";
import Node from "../transform/Node.js";
import TRS from "../transform/TRS.js";
import DrawObject from "../drawobject/DrawObject.js";
import VisualizeCamera from "../wireframe/VisualizeCamera.js";
import CameraLenCone from "../drawobject/CameraLenCone.js";
import Entity from "./Entity.js";

export default class CameraLenConeObject extends Entity {
    registerComponents(): void {
        [
            TRS,
            Node,
            CameraLenCone,
            VisualizeCamera
        ].forEach(ctor => {
            this.add<Component>(ctor);
            this.get<Component>(ctor).setEntity(this);
        });
    }
}