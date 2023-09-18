import Component from "../component/Component.js";
import GLContainer from "../component/GLContainer.js";
import Node from "../component/Node.js";
import TRS from "../component/TRS.js";
import TextureContainer from "../component/TextureContainer.js";
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
            WireframeRenderer
        ].forEach(ctor => {
            this.add<Component>(ctor);
            this.get<Component>(ctor).setEntity(this);
        });
    }
}