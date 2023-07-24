import Component from "../component/Component.js";
import GLContainer from "../component/GLContainer.js";
import Node from "../component/Node.js";
import PrimitiveContainer from "../component/PrimitiveTypeContainer.js";
import TRS from "../component/TRS.js";
import TextureContainer from "../component/TextureContainer.js";
import { PrimitiveType } from "../contextobject/Primitive.js";
import Sprite from "../drawobject/Sprite.js";
import SpriteInPerspectiveRenderer from "../renderer/SpriteInPerspectiveRenderer.js";
import Entity from "./Entity.js";

export default class SpriteInPerspectiveObject extends Entity {
    registerComponents(): void {
        [
            GLContainer,
            TextureContainer,
            TRS,
            Node,
            Sprite,
            SpriteInPerspectiveRenderer,
            PrimitiveContainer
        ].forEach(ctor => {
            this.add<Component>(ctor);
            this.get<Component>(ctor).setEntity(this);
        });
    }
    init(): void {
        this.get(Node).setSource(this.get(TRS));
        this.get(Sprite).init();
        this.get(PrimitiveContainer).setPrimitive(this.get(GLContainer).getRenderingContext().makePrimitive(PrimitiveType.TRIANGLES));
    }
    private frame: number = 0;
    update(): void {
        // console.log([...this.get(Node).getWorldMatrix().getVertics()])
        this.frame++;
        this.get(TRS).getPosition().set(Math.sin(this.frame * 0.05) * 20 - 10, 0,  0, 1);
        this.get(Node).updateWorldMatrix();

        this.get(SpriteInPerspectiveRenderer).render();
    }
}

