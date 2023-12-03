import Component from "./Component.js";
import GLTFSkeletonAnimator from "../animator/GLTFSkeletonAnimator.js";
import Node from "../transform/Node.js";
import TRS from "../transform/TRS.js";
import DrawObject from "../drawobject/DrawObject.js";
import HelloWireframe from "../drawobject/HelloWireframe.js";
import Entity from "./Entity.js";

export default class HelloWireframeObject extends Entity {
    registerComponents(): void {
        [
            TRS,
            Node,
            HelloWireframe,
            GLTFSkeletonAnimator
        ].forEach(ctor => {
            this.add<Component>(ctor);
            this.get<Component>(ctor).setEntity(this);
        });
    }
}