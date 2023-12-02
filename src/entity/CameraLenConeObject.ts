import Component from "./Component.js";
import GLContainer from "../container/GLContainer.js";
import Node from "../transform/Node.js";
import TRS from "../transform/TRS.js";
import TextureContainer from "../container/TextureContainer.js";
import VisualizeCamera from "../wireframe/VisualizeCamera.js";
import CameraLenCone from "../drawobject/CameraLenCone.js";
import { LineRenderer } from "../renderer/LineRenderer.js";
import Entity from "./Entity.js";

export default class CameraLenConeObject extends Entity {
    registerComponents(): void {
        [
            GLContainer,
            TextureContainer,
            TRS,
            Node,
            CameraLenCone,
            VisualizeCamera
        ].forEach(ctor => {
            this.add<Component>(ctor);
            this.get<Component>(ctor).setEntity(this);
        });
    }
}