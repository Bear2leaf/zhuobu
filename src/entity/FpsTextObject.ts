import Component from "../component/Component.js";
import FontInfoContainer from "../component/FontInfoContainer.js";
import GLContainer from "../component/GLContainer.js";
import Node from "../component/Node.js";
import PrimitiveContainer from "../component/PrimitiveTypeContainer.js";
import SizeContainer from "../component/SizeContainer.js";
import TRS from "../component/TRS.js";
import TextureContainer from "../component/TextureContainer.js";
import { PrimitiveType } from "../contextobject/Primitive.js";
import FpsText from "../drawobject/FpsText.js";
import { Vec4 } from "../math/Vector.js";
import SpriteRenderer from "../renderer/SpriteRenderer.js";
import Entity from "./Entity.js";

export default class FpsTextObject extends Entity {
    registerComponents(): void {
        [
            GLContainer,
            TextureContainer,
            SizeContainer,
            TRS,
            Node,
            FpsText,
            SpriteRenderer,
            PrimitiveContainer,
            FontInfoContainer
        ].forEach(ctor => {
            this.add<Component>(ctor);
            this.get<Component>(ctor).setEntity(this);
        });
    }
    init(): void {
        this.get(TRS).getScale().multiply(4);
        this.get(TRS).getPosition().add(new Vec4(0, 0, 0, 0))
        this.get(FpsText).init();

        this.get(PrimitiveContainer).setPrimitive(this.get(GLContainer).getRenderingContext().makePrimitive(PrimitiveType.TRIANGLES));
        
    }
    update(): void {
        this.get(SpriteRenderer).render();
    }
}