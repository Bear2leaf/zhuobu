import Component from "./Component.js";
import GLContainer from "../container/GLContainer.js";
import Node from "../transform/Node.js";
import TRS from "../transform/TRS.js";
import TextureContainer from "../container/TextureContainer.js";
import TouchEventContainer from "../container/TouchEventContainer.js";
import Pointer from "../drawobject/Pointer.js";
import { PointRenderer } from "../renderer/PointRenderer.js";
import OnClickBottomLeftSubject from "../subject/OnClickBottomLeftSubject.js";
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
            OnClickBottomLeftSubject,
            TouchEventContainer
        ].forEach(ctor => {
            this.add<Component>(ctor);
            this.get<Component>(ctor).setEntity(this);
        });
    }
}