import Component from "../component/Component.js";
import GLContainer from "../component/GLContainer.js";
import Node from "../component/Node.js";
import PrimitiveContainer from "../component/PrimitiveTypeContainer.js";
import TRS from "../component/TRS.js";
import TextureContainer from "../component/TextureContainer.js";
import { PrimitiveType } from "../contextobject/Primitive.js";
import Sprite from "../drawobject/Sprite.js";
import { Vec4 } from "../math/Vector.js";
import SpriteRenderer from "../renderer/SpriteRenderer.js";
import Entity from "./Entity.js";

export default class SpriteObject extends Entity {
    registerComponents(): void {
        [
            GLContainer,
            TextureContainer,
            TRS,
            Node,
            Sprite,
            SpriteRenderer,
            PrimitiveContainer
        ].forEach(ctor => {
            this.add<Component>(ctor);
            this.get<Component>(ctor).setEntity(this);
        });
    }
    init(): void {
        this.get(TRS).getScale().set(10, 10, 1, 1);
        this.get(Node).setSource(this.get(TRS));
        this.get(Sprite).init();
        this.get(PrimitiveContainer).setPrimitive(this.get(GLContainer).getRenderingContext().makePrimitive(PrimitiveType.TRIANGLES));
    }
    private frame: number = 0;
    update(): void {
        this.frame++;
        this.get(TRS).getPosition().set(Math.sin(this.frame * 0.05) * 20 + 20, 130,  0, 1);
        this.get(Node).updateWorldMatrix();
        this.get(SpriteRenderer).render();
    }
}