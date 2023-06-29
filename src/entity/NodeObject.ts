import Component from "../component/Component.js";
import GLContainer from "../component/GLContainer.js";
import Node from "../component/Node.js";
import SizeContainer from "../component/SizeContainer.js";
import TRS from "../component/TRS.js";
import Entity from "./Entity.js";

export default class NodeObject extends Entity {
    create(): void {
        [
            GLContainer,
            SizeContainer,
            TRS,
            Node
        ].forEach(ctor => this.add<Component>(ctor));
        
    }
}