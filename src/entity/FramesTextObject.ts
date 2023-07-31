import Component from "../component/Component.js";
import FontInfoContainer from "../component/FontInfoContainer.js";
import GLContainer from "../component/GLContainer.js";
import Node from "../component/Node.js";
import PrimitiveContainer from "../component/PrimitiveTypeContainer.js";
import TRS from "../component/TRS.js";
import TextureContainer from "../component/TextureContainer.js";
import { PrimitiveType } from "../contextobject/Primitive.js";
import FramesText from "../drawobject/FramesText.js";
import { Vec4 } from "../math/Vector.js";
import SpriteRenderer from "../renderer/SpriteRenderer.js";
import Entity from "./Entity.js";

export default class FramesTextObject extends Entity {
    registerComponents(): void {
        [
            GLContainer,
            TextureContainer,
            TRS,
            Node,
            FramesText,
            SpriteRenderer,
            PrimitiveContainer,
            FontInfoContainer
        ].forEach(ctor => {
            this.add<Component>(ctor);
            this.get<Component>(ctor).setEntity(this);
        });
    }
    init(): void {
        const scale = 2;
        this.get(TRS).getScale().set(scale, -scale, scale, 1);
        this.get(TRS).getPosition().add(new Vec4(0, scale * 64, 0, 0))
        this.get(FramesText).init();

        this.get(PrimitiveContainer).setPrimitive(this.get(GLContainer).getRenderingContext().makePrimitive(PrimitiveType.TRIANGLES));
        
    }
    update(): void {
        this.get(SpriteRenderer).render();
    }
}