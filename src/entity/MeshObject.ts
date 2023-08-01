import Component from "../component/Component.js";
import GLContainer from "../component/GLContainer.js";
import Node from "../component/Node.js";
import TRS from "../component/TRS.js";
import TextureContainer from "../component/TextureContainer.js";
import WhaleMesh from "../drawobject/WhaleMesh.js";
import GLTFMeshRenderer from "../renderer/GLTFMeshRenderer.js";
import Entity from "./Entity.js";

export default class MeshObject extends Entity {
    registerComponents(): void {
        [
            GLContainer,
            TextureContainer,
            TRS,
            Node,
            WhaleMesh,
            GLTFMeshRenderer
        ].forEach(ctor => {
            this.add<Component>(ctor);
            this.get<Component>(ctor).setEntity(this);
        });
    }
    init(): void {
        this.get(WhaleMesh).init();
    }
    update(): void {
    }
}