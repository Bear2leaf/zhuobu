import Component from "./Component.js";
import GLTFSkeletonAnimator from "../animator/GLTFSkeletonAnimator.js";
import Node from "../transform/Node.js";
import TRS from "../transform/TRS.js";
import DrawObject from "../drawobject/DrawObject.js";
import TouchEvent from "../event/TouchEvent.js";
import WhaleMesh from "../drawobject/WhaleMesh.js";
import OnClickPickSayHello from "../observer/OnClickPickSayHello.js";
import OnClickPickSubject from "../subject/OnClickPickSubject.js";
import Entity from "./Entity.js";

export default class SkinMeshObject extends Entity {
    registerComponents(): void {
        [
            TRS,
            Node,
            WhaleMesh,
            GLTFSkeletonAnimator,
            OnClickPickSubject,
            OnClickPickSayHello,
            TouchEvent
        ].forEach(ctor => {
            this.add<Component>(ctor);
            this.get<Component>(ctor).setEntity(this);
        });
    }
}