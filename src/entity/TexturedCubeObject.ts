import Component from "../component/Component.js";
import GLContainer from "../component/GLContainer.js";
import Node from "../component/Node.js";
import TRS from "../component/TRS.js";
import TextureContainer from "../component/TextureContainer.js";
import TexturedCube from "../drawobject/TexturedCube.js";
import { VertexColorTriangleRenderer } from "../renderer/VertexColorTriangleRenderer.js";
import Entity from "./Entity.js";

export default class TexturedCubeObject extends Entity {
    registerComponents(): void {
        [
            GLContainer,
            TextureContainer,
            TRS,
            Node,
            TexturedCube,
            VertexColorTriangleRenderer
        ].forEach(ctor => {
            this.add<Component>(ctor);
            this.get<Component>(ctor).setEntity(this);
        });
    }
}