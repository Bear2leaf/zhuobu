import Component from "../component/Component.js";
import GLContainer from "../container/GLContainer.js";
import Node from "../transform/Node.js";
import FrontgroundFrame from "../wireframe/FrontgroundFrame.js";
import TRS from "../transform/TRS.js";
import TextureContainer from "../container/TextureContainer.js";
import WireQuad from "../drawobject/WireQuad.js";
import { LineRenderer } from "../renderer/LineRenderer.js";
import Entity from "./Entity.js";
import VisualizeCamera from "../wireframe/VisualizeCamera.js";

export default class FrontgroundFrameObject extends Entity {
    registerComponents(): void {
        [
            GLContainer,
            TextureContainer,
            TRS,
            Node,
            WireQuad,
            FrontgroundFrame,
            VisualizeCamera,
            LineRenderer
        ].forEach(ctor => {
            this.add<Component>(ctor);
            this.get<Component>(ctor).setEntity(this);
        });
    }
}