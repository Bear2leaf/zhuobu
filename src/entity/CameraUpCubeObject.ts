import Component from "../component/Component.js";
import GLContainer from "../container/GLContainer.js";
import Node from "../transform/Node.js";
import CameraUpCube from "../drawobject/CameraUpCube.js";
import { LineRenderer } from "../renderer/LineRenderer.js";
import Entity from "./Entity.js";
import TextureContainer from "../container/TextureContainer.js";
import TRS from "../transform/TRS.js";
import VisualizeCamera from "../wireframe/VisualizeCamera.js";

export default class CameraUpCubeObject extends Entity {
    registerComponents(): void {
        [
            GLContainer,
            TextureContainer,
            TRS,
            Node,
            CameraUpCube,
            VisualizeCamera,
            LineRenderer
        ].forEach(ctor => {
            this.add<Component>(ctor);
            this.get<Component>(ctor).setEntity(this);
        });
    }
}