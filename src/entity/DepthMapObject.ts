import Component from "./Component.js";
import DepthMap from "../texturemap/DepthMap.js";
import GLContainer from "../container/GLContainer.js";
import Node from "../transform/Node.js";
import TRS from "../transform/TRS.js";
import TextureContainer from "../container/TextureContainer.js";
import Sprite from "../drawobject/Sprite.js";
import SpriteRenderer from "../renderer/SpriteRenderer.js";
import Entity from "./Entity.js";

export default class DepthMapObject extends Entity {
    registerComponents(): void {
        [
            GLContainer,
            TextureContainer,
            DepthMap,
            TRS,
            Node,
            Sprite
        ].forEach(ctor => {
            this.add<Component>(ctor);
            this.get<Component>(ctor).setEntity(this);
        });
    }
}