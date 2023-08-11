import Component from "../component/Component.js";
import GLContainer from "../component/GLContainer.js";
import Node from "../component/Node.js";
import TRS from "../component/TRS.js";
import TextureContainer from "../component/TextureContainer.js";
import HelloMultiMesh from "../drawobject/HelloMultiMesh.js";
import PickColor from "../pickcolor/PickColor.js";
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
            PickColor,
            GLTFMeshRenderer
        ].forEach(ctor => {
            this.add<Component>(ctor);
            this.get<Component>(ctor).setEntity(this);
        });
    }
}