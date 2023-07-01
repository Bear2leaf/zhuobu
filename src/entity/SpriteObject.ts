import Component from "../component/Component.js";
import GLContainer from "../component/GLContainer.js";
import Node from "../component/Node.js";
import PrimitiveTypeContainer from "../component/PrimitiveTypeContainer.js";
import SizeContainer from "../component/SizeContainer.js";
import TRS from "../component/TRS.js";
import TouchEventContainer from "../component/TouchEventContainer.js";
import Sprite from "../drawobject/Sprite.js";
import SpriteRenderer from "../renderer/SpriteRenderer.js";
import Entity from "./Entity.js";

export default class SpriteObject extends Entity {
    create(): void {
        [
            GLContainer,
            SizeContainer,
            TRS,
            Node,
            Sprite,
            SpriteRenderer,
            TouchEventContainer,
            PrimitiveTypeContainer
        ].forEach(ctor => this.add<Component>(ctor));
        
    }
    update(): void {
        if (this.get(TouchEventContainer).getIsTouchingStart()) {
            console.log("SpriteObject is touched");
        }
    }
}