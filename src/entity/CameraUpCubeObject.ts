import Component from "./Component.js";
import Node from "../transform/Node.js";
import CameraUpCube from "../drawobject/CameraUpCube.js";
import Entity from "./Entity.js";
import TRS from "../transform/TRS.js";
import VisualizeCamera from "../wireframe/VisualizeCamera.js";

export default class CameraUpCubeObject extends Entity {
    registerComponents(): void {
        [
            TRS,
            Node,
            CameraUpCube,
            VisualizeCamera
        ].forEach(ctor => {
            this.add<Component>(ctor);
            this.get<Component>(ctor).setEntity(this);
        });
    }
}