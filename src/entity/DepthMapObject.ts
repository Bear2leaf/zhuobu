import Component from "../component/Component.js";
import DepthMap from "../component/DepthMap.js";
import GLContainer from "../component/GLContainer.js";
import Node from "../component/Node.js";
import TRS from "../component/TRS.js";
import TextureContainer from "../component/TextureContainer.js";
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
            Sprite,
            SpriteRenderer
        ].forEach(ctor => {
            this.add<Component>(ctor);
            this.get<Component>(ctor).setEntity(this);
        });
    }
}