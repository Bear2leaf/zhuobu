import BackgroundFrame from "../wireframe/BackgroundFrame.js";
import Component from "./Component.js";
import GLContainer from "../container/GLContainer.js";
import Node from "../transform/Node.js";
import TRS from "../transform/TRS.js";
import TextureContainer from "../container/TextureContainer.js";
import VisualizeCamera from "../wireframe/VisualizeCamera.js";
import WireQuad from "../drawobject/WireQuad.js";
import { LineRenderer } from "../renderer/LineRenderer.js";
import Entity from "./Entity.js";

export default class BackgroundFrameObject extends Entity {
    registerComponents(): void {
        [
            GLContainer,
            TextureContainer,
            TRS,
            Node,
            WireQuad,
            BackgroundFrame,
            VisualizeCamera
        ].forEach(ctor => {
            this.add<Component>(ctor);
            this.get<Component>(ctor).setEntity(this);
        });
    }
}