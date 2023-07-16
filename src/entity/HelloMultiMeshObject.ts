import Component from "../component/Component.js";
import GLContainer from "../component/GLContainer.js";
import Node from "../component/Node.js";
import PrimitiveContainer from "../component/PrimitiveTypeContainer.js";
import TRS from "../component/TRS.js";
import TextureContainer from "../component/TextureContainer.js";
import { PrimitiveType } from "../contextobject/Primitive.js";
import HelloMultiMesh from "../drawobject/HelloMultiMesh.js";
import Mesh from "../drawobject/Mesh.js";
import GLTFMeshRenderer from "../renderer/GLTFMeshRenderer.js";
import Entity from "./Entity.js";

export default class HelloMultiMeshObject extends Entity {
    registerComponents(): void {
        [
            GLContainer,
            TextureContainer,
            TRS,
            Node,
            HelloMultiMesh,
            GLTFMeshRenderer,
            PrimitiveContainer
        ].forEach(ctor => {
            this.add<Component>(ctor);
            this.get<Component>(ctor).setEntity(this);
        });
    }
    init(): void {
        this.get(Mesh).init();
        this.get(PrimitiveContainer).setPrimitive(this.get(GLContainer).getRenderingContext().makePrimitive(PrimitiveType.TRIANGLES));
    }
    update(): void {
        this.get(GLTFMeshRenderer).render();
    }
}