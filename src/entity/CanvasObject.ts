import Component from "./Component.js";
import GLContainer from "../container/GLContainer.js";
import Node from "../transform/Node.js";
import TRS from "../transform/TRS.js";
import TextureContainer from "../container/TextureContainer.js";
import Sprite from "../drawobject/Sprite.js";
import SpriteRenderer from "../renderer/SpriteRenderer.js";
import Entity from "./Entity.js";
import SingleColorCanvasMap from "../texturemap/SingleColorCanvasMap.js";

export default class CanvasObject extends Entity {
    registerComponents(): void {
        [
            GLContainer,
            TextureContainer,
            TRS,
            Node,
            Sprite,
            SpriteRenderer,
            SingleColorCanvasMap
        ].forEach(ctor => {
            this.add<Component>(ctor);
            this.get<Component>(ctor).setEntity(this);
        });
    }
}