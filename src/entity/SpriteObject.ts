import Component from "../component/Component.js";
import GLContainer from "../component/GLContainer.js";
import Node from "../component/Node.js";
import PrimitiveContainer from "../component/PrimitiveTypeContainer.js";
import SizeContainer from "../component/SizeContainer.js";
import TRS from "../component/TRS.js";
import TextureContainer from "../component/TextureContainer.js";
import TouchEventContainer from "../component/TouchEventContainer.js";
import { PrimitiveType } from "../contextobject/Primitive.js";
import Sprite from "../drawobject/Sprite.js";
import SpriteRenderer from "../renderer/SpriteRenderer.js";
import Entity from "./Entity.js";

export default class SpriteObject extends Entity {
    registerComponents(): void {
        [
            GLContainer,
            TextureContainer,
            SizeContainer,
            TRS,
            Node,
            Sprite,
            SpriteRenderer,
            TouchEventContainer,
            PrimitiveContainer
        ].forEach(ctor => this.add<Component>(ctor));
    }
    init(): void {
        this.get(Sprite).setEntity(this);
        this.get(SpriteRenderer).setEntity(this);
        this.get(Sprite).init();
        this.get(PrimitiveContainer).setPrimitive(this.get(GLContainer).getRenderingContext().makePrimitive(PrimitiveType.TRIANGLES));
        
    }
    update(): void {
        if (this.get(TouchEventContainer).getIsTouchingStart()) {
            console.log("SpriteObject is touched");
        }
        this.get(SpriteRenderer).render();
    }
}