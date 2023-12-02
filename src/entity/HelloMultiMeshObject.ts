import Component from "./Component.js";
import GLContainer from "../container/GLContainer.js";
import Node from "../transform/Node.js";
import TRS from "../transform/TRS.js";
import TextureContainer from "../container/TextureContainer.js";
import TouchEventContainer from "../container/TouchEventContainer.js";
import HelloMultiMesh from "../drawobject/HelloMultiMesh.js";
import OnClickPickSayHello from "../observer/OnClickPickSayHello.js";
import GLTFMeshRenderer from "../renderer/GLTFMeshRenderer.js";
import OnClickPickSubject from "../subject/OnClickPickSubject.js";
import Entity from "./Entity.js";

export default class HelloMultiMeshObject extends Entity {
    registerComponents(): void {
        [
            GLContainer,
            TextureContainer,
            TRS,
            Node,
            HelloMultiMesh,
            OnClickPickSubject,
            OnClickPickSayHello,
            TouchEventContainer
        ].forEach(ctor => {
            this.add<Component>(ctor);
            this.get<Component>(ctor).setEntity(this);
        });
    }
}