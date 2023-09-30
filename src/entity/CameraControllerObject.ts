import CameraController from "../component/CameraController.js";
import Component from "../component/Component.js";
import Node from "../component/Node.js";
import TRS from "../component/TRS.js";
import Entity from "./Entity.js";

export default class CameraControllerObject extends Entity {
    registerComponents(): void {
        [
            TRS,
            Node,
            CameraController,
        ].forEach(ctor => {
            this.add<Component>(ctor);
            this.get<Component>(ctor).setEntity(this);
        });
    }
}