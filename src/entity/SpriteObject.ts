import Component from "../component/Component.js";
import GLContainer from "../component/GLContainer.js";
import Node from "../component/Node.js";
import SinAnimation from "../component/SinAnimation.js";
import TRS from "../component/TRS.js";
import TextureContainer from "../component/TextureContainer.js";
import Sprite from "../drawobject/Sprite.js";
import OnClickToggleAnim from "../observer/OnClickToggleAnim.js";
import SpriteRenderer from "../renderer/SpriteRenderer.js";
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
            OnClickToggleAnim,
            SinAnimation
        ].forEach(ctor => {
            this.add<Component>(ctor);
            this.get<Component>(ctor).setEntity(this);
        });
    }
}