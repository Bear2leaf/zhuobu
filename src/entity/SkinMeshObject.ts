import Component from "../component/Component.js";
import GLContainer from "../component/GLContainer.js";
import GLTFAnimationController from "../component/GLTFAnimationController.js";
import Node from "../component/Node.js";
import TRS from "../component/TRS.js";
import TextureContainer from "../component/TextureContainer.js";
import TouchEventContainer from "../component/TouchEventContainer.js";
import WhaleMesh from "../drawobject/WhaleMesh.js";
import OnClickPickSayHello from "../observer/OnClickPickSayHello.js";
import GLTFSkinMeshRenderer from "../renderer/GLTFSkinMeshRenderer.js";
import OnClickPickSubject from "../subject/OnClickPickSubject.js";
import Entity from "./Entity.js";

export default class SkinMeshObject extends Entity {
    registerComponents(): void {
        [
            GLContainer,
            TextureContainer,
            TRS,
            Node,
            WhaleMesh,
            GLTFAnimationController,
            OnClickPickSubject,
            OnClickPickSayHello,
            TouchEventContainer,
            GLTFSkinMeshRenderer
        ].forEach(ctor => {
            this.add<Component>(ctor);
            this.get<Component>(ctor).setEntity(this);
        });
    }
}