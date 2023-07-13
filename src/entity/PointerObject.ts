import Component from "../component/Component.js";
import GLContainer from "../component/GLContainer.js";
import Node from "../component/Node.js";
import PrimitiveContainer from "../component/PrimitiveTypeContainer.js";
import SizeContainer from "../component/SizeContainer.js";
import TRS from "../component/TRS.js";
import TextureContainer from "../component/TextureContainer.js";
import TouchEventContainer from "../component/TouchEventContainer.js";
import { PrimitiveType } from "../contextobject/Primitive.js";
import Pointer from "../drawobject/Pointer.js";
import { PointRenderer } from "../renderer/PointRenderer.js";
import Entity from "./Entity.js";

export default class PointerObject extends Entity {
    registerComponents(): void {
        [
            GLContainer,
            TextureContainer,
            SizeContainer,
            TRS,
            Node,
            Pointer,
            PointRenderer,
            TouchEventContainer,
            PrimitiveContainer
        ].forEach(ctor => {
            this.add<Component>(ctor);
            this.get<Component>(ctor).setEntity(this);
        });
    }
    init(): void {
        this.get(Pointer).init();
        this.get(PrimitiveContainer).setPrimitive(this.get(GLContainer).getRenderingContext().makePrimitive(PrimitiveType.POINTS));
        
    }
    update(): void {
        if (this.get(TouchEventContainer).getIsTouchingStart()) {
            
        }
        this.get(PointRenderer).render();
    }
}