import Component from "../component/Component.js";
import GLContainer from "../component/GLContainer.js";
import Node from "../component/Node.js";
import FrontgroundFrame from "../component/FrontgroundFrame.js";
import TRS from "../component/TRS.js";
import TextureContainer from "../component/TextureContainer.js";
import WireQuad from "../drawobject/WireQuad.js";
import { LineRenderer } from "../renderer/LineRenderer.js";
import Entity from "./Entity.js";

export default class FrontgroundFrameObject extends Entity {
    registerComponents(): void {
        [
            GLContainer,
            TextureContainer,
            TRS,
            Node,
            WireQuad,
            FrontgroundFrame,
            LineRenderer
        ].forEach(ctor => {
            this.add<Component>(ctor);
            this.get<Component>(ctor).setEntity(this);
        });
    }
    init(): void {
        this.get(WireQuad).init();
        this.get(FrontgroundFrame).initTRS();
    }
    update(): void {
    }
}