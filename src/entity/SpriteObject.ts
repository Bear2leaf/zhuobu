import Component from "../component/Component.js";
import GLContainer from "../component/GLContainer.js";
import Node from "../component/Node.js";
import SizeContainer from "../component/SizeContainer.js";
import TRS from "../component/TRS.js";
import SpriteRenderer from "../renderer/SpriteRenderer.js";
import Entity from "./Entity.js";

export default class SpriteObject extends Entity {
    create(): void {
        [
            GLContainer,
            SizeContainer,
            TRS,
            Node,
            SpriteRenderer
        ].forEach(ctor => this.addComponent<Component>(ctor));
    }
}