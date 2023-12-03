import Component from "./Component.js";
import Node from "../transform/Node.js";
import CircleAnimator from "../animator/CircleAnimator.js";
import TRS from "../transform/TRS.js";
import TouchEvent from "../event/TouchEvent.js";
import OnClickToggleAnim from "../observer/OnClickToggleAnim.js";
import OnClickToggleScale from "../observer/OnClickToggleScale.js";
import OnClickSpriteSubject from "../subject/OnClickSpriteSubject.js";
import Entity from "./Entity.js";
import DefaultSprite from "../sprite/DefaultSprite.js";
import MoveCircleController from "../controller/MoveCircleController.js";

export default class SpriteObject extends Entity {
    registerComponents(): void {
        [
            TRS,
            Node,
            DefaultSprite,
            OnClickSpriteSubject,
            OnClickToggleAnim,
            OnClickToggleScale,
            TouchEvent,
            MoveCircleController
        ].forEach(ctor => {
            this.add<Component>(ctor);
            this.get<Component>(ctor).setEntity(this);
        });
    }
}