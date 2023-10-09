import Component from "../component/Component.js";
import GLContainer from "../container/GLContainer.js";
import Node from "../transform/Node.js";
import CircleAnimator from "../animator/CircleAnimator.js";
import TRS from "../transform/TRS.js";
import TextureContainer from "../container/TextureContainer.js";
import TouchEventContainer from "../container/TouchEventContainer.js";
import Sprite from "../drawobject/Sprite.js";
import OnClickToggleAnim from "../observer/OnClickToggleAnim.js";
import OnClickToggleScale from "../observer/OnClickToggleScale.js";
import SpriteRenderer from "../renderer/SpriteRenderer.js";
import OnClickSpriteSubject from "../subject/OnClickSpriteSubject.js";
import Entity from "./Entity.js";

export default class SpriteObject extends Entity {
    registerComponents(): void {
        [
            GLContainer,
            TextureContainer,
            TRS,
            Node,
            Sprite,
            SpriteRenderer,
            OnClickSpriteSubject,
            OnClickToggleAnim,
            OnClickToggleScale,
            TouchEventContainer,
            CircleAnimator
        ].forEach(ctor => {
            this.add<Component>(ctor);
            this.get<Component>(ctor).setEntity(this);
        });
    }
}