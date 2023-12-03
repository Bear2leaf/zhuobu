import Component from "./Component.js";
import Node from "../transform/Node.js";
import CircleAnimator from "../animator/CircleAnimator.js";
import TRS from "../transform/TRS.js";
import DrawObject from "../drawobject/DrawObject.js";
import TouchEvent from "../event/TouchEvent.js";
import Sprite from "../drawobject/Sprite.js";
import OnClickToggleAnim from "../observer/OnClickToggleAnim.js";
import OnClickToggleScale from "../observer/OnClickToggleScale.js";
import OnClickSpriteSubject from "../subject/OnClickSpriteSubject.js";
import Entity from "./Entity.js";

export default class SpriteObject extends Entity {
    registerComponents(): void {
        [
            TRS,
            Node,
            Sprite,
            OnClickSpriteSubject,
            OnClickToggleAnim,
            OnClickToggleScale,
            TouchEvent,
            CircleAnimator
        ].forEach(ctor => {
            this.add<Component>(ctor);
            this.get<Component>(ctor).setEntity(this);
        });
    }
}