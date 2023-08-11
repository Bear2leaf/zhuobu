import Component from "../component/Component.js";
import GLContainer from "../component/GLContainer.js";
import Node from "../component/Node.js";
import PickMap from "../component/PickMap.js";
import TRS from "../component/TRS.js";
import TextureContainer from "../component/TextureContainer.js";
import TouchEventContainer from "../component/TouchEventContainer.js";
import Sprite from "../drawobject/Sprite.js";
import OnPickSayHelloPick from "../observer/OnPickSayHelloPick.js";
import SpriteRenderer from "../renderer/SpriteRenderer.js";
import OnPickSubject from "../subject/OnPickSubject.js";
import Entity from "./Entity.js";

export default class PickMapObject extends Entity {
    registerComponents(): void {
        [
            GLContainer,
            TextureContainer,
            PickMap,
            OnPickSayHelloPick,
            OnPickSubject,
            TouchEventContainer,
            TRS,
            Node,
            Sprite,
            SpriteRenderer
        ].forEach(ctor => {
            this.add<Component>(ctor);
            this.get<Component>(ctor).setEntity(this);
        });
    }
}