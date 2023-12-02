import Component from "./Component.js";
import GLContainer from "../container/GLContainer.js";
import GLTFSkeletonAnimator from "../animator/GLTFSkeletonAnimator.js";
import Node from "../transform/Node.js";
import TRS from "../transform/TRS.js";
import TextureContainer from "../container/TextureContainer.js";
import TouchEventContainer from "../container/TouchEventContainer.js";
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
            GLTFSkeletonAnimator,
            OnClickPickSubject,
            OnClickPickSayHello,
            TouchEventContainer
        ].forEach(ctor => {
            this.add<Component>(ctor);
            this.get<Component>(ctor).setEntity(this);
        });
    }
}