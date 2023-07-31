import Component from "../component/Component.js";
import GLContainer from "../component/GLContainer.js";
import Node from "../component/Node.js";
import PrimitiveContainer from "../component/PrimitiveTypeContainer.js";
import TRS from "../component/TRS.js";
import TextureContainer from "../component/TextureContainer.js";
import { PrimitiveType } from "../contextobject/Primitive.js";
import Histogram from "../drawobject/Histogram.js";
import { TriangleRenderer } from "../renderer/TriangleRenderer.js";
import Entity from "./Entity.js";

export default class FpsChartObject extends Entity {
    registerComponents(): void {
        [
            GLContainer,
            TextureContainer,
            TRS,
            Node,
            Histogram,
            TriangleRenderer,
            PrimitiveContainer
        ].forEach(ctor => {
            this.add<Component>(ctor);
            this.get<Component>(ctor).setEntity(this);
        });
    }
    init(): void {
        this.get(Histogram).init();
        this.get(TRS).getPosition().set(200, 40, 0, 1);
        this.get(PrimitiveContainer).setPrimitive(this.get(GLContainer).getRenderingContext().makePrimitive(PrimitiveType.TRIANGLES));
        
    }
    update(): void {
        this.get(TriangleRenderer).render();
    }
}