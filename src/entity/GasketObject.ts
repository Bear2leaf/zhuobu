import Component from "../component/Component.js";
import GLContainer from "../component/GLContainer.js";
import Node from "../component/Node.js";
import TRS from "../component/TRS.js";
import TextureContainer from "../component/TextureContainer.js";
import Gasket from "../drawobject/Gasket.js";
import { VertexColorTriangleRenderer } from "../renderer/VertexColorTriangleRenderer.js";
import Entity from "./Entity.js";

export default class GasketObject extends Entity {
    registerComponents(): void {
        [
            GLContainer,
            TextureContainer,
            TRS,
            Node,
            Gasket,
            VertexColorTriangleRenderer
        ].forEach(ctor => {
            this.add<Component>(ctor);
            this.get<Component>(ctor).setEntity(this);
        });
    }
}