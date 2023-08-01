import Component from "../component/Component.js";
import GLContainer from "../component/GLContainer.js";
import Node from "../component/Node.js";
import TRS from "../component/TRS.js";
import TextureContainer from "../component/TextureContainer.js";
import { PrimitiveType } from "../contextobject/Primitive.js";
import HelloMesh from "../drawobject/HelloMesh.js";
import Mesh from "../drawobject/Mesh.js";
import GLTFMeshRenderer from "../renderer/GLTFMeshRenderer.js";
import Entity from "./Entity.js";

export default class HelloMeshObject extends Entity {
    registerComponents(): void {
        [
            GLContainer,
            TextureContainer,
            TRS,
            Node,
            HelloMesh,
            GLTFMeshRenderer
        ].forEach(ctor => {
            this.add<Component>(ctor);
            this.get<Component>(ctor).setEntity(this);
        });
    }
    init(): void {
        this.get(Mesh).init();
    }
    update(): void {
    }
}