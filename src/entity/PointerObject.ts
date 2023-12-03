import Component from "./Component.js";
import Node from "../transform/Node.js";
import TRS from "../transform/TRS.js";
import DrawObject from "../drawobject/DrawObject.js";
import TouchEvent from "../event/TouchEvent.js";
import Pointer from "../drawobject/Pointer.js";
import OnClickBottomLeftSubject from "../subject/OnClickBottomLeftSubject.js";
import OnClickSubject from "../subject/OnClickSubject.js";
import Entity from "./Entity.js";

export default class PointerObject extends Entity {
    registerComponents(): void {
        [
            TRS,
            Node,
            Pointer,
            OnClickSubject,
            OnClickBottomLeftSubject,
            TouchEvent
        ].forEach(ctor => {
            this.add<Component>(ctor);
            this.get<Component>(ctor).setEntity(this);
        });
    }
}