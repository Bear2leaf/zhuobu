import Component from "../component/Component.js";
import Flowers from "../component/Flowers.js";
import GLContainer from "../container/GLContainer.js";
import Node from "../transform/Node.js";
import TRS from "../transform/TRS.js";
import TextureContainer from "../container/TextureContainer.js";
import Sprite from "../drawobject/Sprite.js";
import SpriteRenderer from "../renderer/SpriteRenderer.js";
import Entity from "./Entity.js";

export default class FlowersObject extends Entity {
    registerComponents(): void {
        [
            GLContainer,
            TextureContainer,
            TRS,
            Node,
            Sprite,
            SpriteRenderer,
            Flowers
        ].forEach(ctor => {
            this.add<Component>(ctor);
            this.get<Component>(ctor).setEntity(this);
        });
    }
}