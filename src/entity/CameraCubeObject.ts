import Component from "../component/Component.js";
import GLContainer from "../container/GLContainer.js";
import Node from "../transform/Node.js";
import TRS from "../transform/TRS.js";
import TextureContainer from "../container/TextureContainer.js";
import VisualizeCamera from "../wireframe/VisualizeCamera.js";
import CameraCube from "../drawobject/CameraCube.js";
import { LineRenderer } from "../renderer/LineRenderer.js";
import Entity from "./Entity.js";

export default class CameraCubeObject extends Entity {
    registerComponents(): void {
        [
            GLContainer,
            TextureContainer,
            TRS,
            Node,
            CameraCube,
            VisualizeCamera,
            LineRenderer
        ].forEach(ctor => {
            this.add<Component>(ctor);
            this.get<Component>(ctor).setEntity(this);
        });
    }
}