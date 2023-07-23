import Component from "../component/Component.js";
import GLContainer from "../component/GLContainer.js";
import Node from "../component/Node.js";
import PrimitiveContainer from "../component/PrimitiveTypeContainer.js";
import TRS from "../component/TRS.js";
import TextureContainer from "../component/TextureContainer.js";
import { PrimitiveType } from "../contextobject/Primitive.js";
import WireQuad from "../drawobject/WireQuad.js";
import { Vec4 } from "../math/Vector.js";
import { LineRenderer } from "../renderer/LineRenderer.js";
import Entity from "./Entity.js";

export default class UIBorderObject extends Entity {
    registerComponents(): void {
        [
            GLContainer,
            TextureContainer,
            TRS,
            Node,
            WireQuad,
            LineRenderer,
            PrimitiveContainer
        ].forEach(ctor => {
            this.add<Component>(ctor);
            this.get<Component>(ctor).setEntity(this);
        });
    }
    init(): void {
        this.get(WireQuad).init();
        this.get(TRS).getScale().add(new Vec4(0.001, 0.001, 0, 0));
        this.get(PrimitiveContainer).setPrimitive(this.get(GLContainer).getRenderingContext().makePrimitive(PrimitiveType.LINES));
    }
    update(): void {
        this.get(LineRenderer).render();
    }
}