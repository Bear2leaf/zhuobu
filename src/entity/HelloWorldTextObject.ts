import Component from "../component/Component.js";
import GLContainer from "../container/GLContainer.js";
import Node from "../transform/Node.js";
import TRS from "../transform/TRS.js";
import TextureContainer from "../container/TextureContainer.js";
import HelloWorldText from "../drawobject/HelloWorldText.js";
import SpriteRenderer from "../renderer/SpriteRenderer.js";
import Entity from "./Entity.js";

export default class HelloWorldTextObject extends Entity {
    registerComponents(): void {
        [
            GLContainer,
            TextureContainer,
            TRS,
            Node,
            HelloWorldText,
            SpriteRenderer
        ].forEach(ctor => {
            this.add<Component>(ctor);
            this.get<Component>(ctor).setEntity(this);
        });
    }
}