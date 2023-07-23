import Border from "../component/Border.js";
import Component from "../component/Component.js";
import GLContainer from "../component/GLContainer.js";
import Node from "../component/Node.js";
import PrimitiveContainer from "../component/PrimitiveTypeContainer.js";
import TRS from "../component/TRS.js";
import TextureContainer from "../component/TextureContainer.js";
import { PrimitiveType } from "../contextobject/Primitive.js";
import WireQuad from "../drawobject/WireQuad.js";
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
            Border,
            LineRenderer,
            PrimitiveContainer
        ].forEach(ctor => {
            this.add<Component>(ctor);
            this.get<Component>(ctor).setEntity(this);
        });
    }
    init(): void {
        this.get(WireQuad).init();
        this.get(TRS).getScale().set(1.1, 1.1, 1, 1);
        this.get(PrimitiveContainer).setPrimitive(this.get(GLContainer).getRenderingContext().makePrimitive(PrimitiveType.LINES));
    }
    update(): void {
        this.get(LineRenderer).render();
    }
}