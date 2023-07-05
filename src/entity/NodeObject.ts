import Component from "../component/Component.js";
import GLContainer from "../component/GLContainer.js";
import Node from "../component/Node.js";
import SizeContainer from "../component/SizeContainer.js";
import TRS from "../component/TRS.js";
import TouchEventContainer from "../component/TouchEventContainer.js";
import Entity from "./Entity.js";

export default class NodeObject extends Entity {
    registerComponents(): void {
        
        [
            GLContainer,
            SizeContainer,
            TRS,
            Node,
            TouchEventContainer
        ].forEach(ctor => {
            this.add<Component>(ctor);
            this.get<Component>(ctor).setEntity(this);
        });
    }
    init(): void {
    }
    update(): void {
        
    }
}