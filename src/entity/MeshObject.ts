import Component from "./Component.js";
import GLContainer from "../container/GLContainer.js";
import Node from "../transform/Node.js";
import TRS from "../transform/TRS.js";
import TextureContainer from "../container/TextureContainer.js";
import TouchEventContainer from "../container/TouchEventContainer.js";
import WhaleMesh from "../drawobject/WhaleMesh.js";
import OnClickPickSayHello from "../observer/OnClickPickSayHello.js";
import GLTFMeshRenderer from "../renderer/GLTFMeshRenderer.js";
import OnClickPickSubject from "../subject/OnClickPickSubject.js";
import Entity from "./Entity.js";

export default class MeshObject extends Entity {
    registerComponents(): void {
        [
            GLContainer,
            TextureContainer,
            TRS,
            Node,
            WhaleMesh,
            OnClickPickSubject,
            OnClickPickSayHello,
            TouchEventContainer,
            GLTFMeshRenderer
        ].forEach(ctor => {
            this.add<Component>(ctor);
            this.get<Component>(ctor).setEntity(this);
        });
    }
}