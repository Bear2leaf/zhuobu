import Component from "./Component.js";
import GLTFAnimator from "../animator/GLTFAnimator.js";
import Node from "../transform/Node.js";
import TRS from "../transform/TRS.js";
import DrawObject from "../drawobject/DrawObject.js";
import TouchEvent from "../event/TouchEvent.js";
import WhaleMesh from "../drawobject/WhaleMesh.js";
import OnClickPickSayHello from "../observer/OnClickPickSayHello.js";
import OnClickPickSubject from "../subject/OnClickPickSubject.js";
import Entity from "./Entity.js";
import GLTFAnimationController from "../controller/GLTFAnimationController.js";

export default class SkinMeshObject extends Entity {
    registerComponents(): void {
        [
            TRS,
            Node,
            WhaleMesh,
            GLTFAnimationController,
            OnClickPickSubject,
            OnClickPickSayHello,
            TouchEvent
        ].forEach(ctor => {
            this.add<Component>(ctor);
            this.get<Component>(ctor).setEntity(this);
        });
    }
}