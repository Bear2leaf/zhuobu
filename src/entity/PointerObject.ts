import Component from "../component/Component.js";
import GLContainer from "../component/GLContainer.js";
import Node from "../component/Node.js";
import TRS from "../component/TRS.js";
import TextureContainer from "../component/TextureContainer.js";
import TouchEventContainer from "../component/TouchEventContainer.js";
import Pointer from "../drawobject/Pointer.js";
import { PointRenderer } from "../renderer/PointRenderer.js";
import OnClickSubject from "../subject/OnClickSubject.js";
import Entity from "./Entity.js";

export default class PointerObject extends Entity {
    registerComponents(): void {
        [
            GLContainer,
            TextureContainer,
            TRS,
            Node,
            Pointer,
            PointRenderer,
            OnClickSubject,
            TouchEventContainer
        ].forEach(ctor => {
            this.add<Component>(ctor);
            this.get<Component>(ctor).setEntity(this);
        });
    }
}