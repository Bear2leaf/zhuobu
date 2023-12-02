import Component from "./Component.js";
import GLContainer from "../container/GLContainer.js";
import Node from "../transform/Node.js";
import TRS from "../transform/TRS.js";
import TextureContainer from "../container/TextureContainer.js";
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
            TexturedCube
        ].forEach(ctor => {
            this.add<Component>(ctor);
            this.get<Component>(ctor).setEntity(this);
        });
    }
}