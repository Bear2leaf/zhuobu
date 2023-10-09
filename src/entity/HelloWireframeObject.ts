import Component from "./Component.js";
import GLContainer from "../container/GLContainer.js";
import GLTFSkeletonAnimator from "../animator/GLTFSkeletonAnimator.js";
import Node from "../transform/Node.js";
import TRS from "../transform/TRS.js";
import TextureContainer from "../container/TextureContainer.js";
import HelloWireframe from "../drawobject/HelloWireframe.js";
import WireframeRenderer from "../renderer/WireframeRenderer.js";
import Entity from "./Entity.js";

export default class HelloWireframeObject extends Entity {
    registerComponents(): void {
        [
            GLContainer,
            TextureContainer,
            TRS,
            Node,
            HelloWireframe,
            WireframeRenderer,
            GLTFSkeletonAnimator
        ].forEach(ctor => {
            this.add<Component>(ctor);
            this.get<Component>(ctor).setEntity(this);
        });
    }
}