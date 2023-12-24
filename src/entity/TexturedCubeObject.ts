import Component from "./Component.js";
import Node from "../transform/Node.js";
import TRS from "../transform/TRS.js";
import DrawObject from "../drawobject/DrawObject.js";
import TexturedCube from "../drawobject/TexturedCube.js";
import Entity from "./Entity.js";

export default class TexturedCubeObject extends Entity {
    addDefaultComponents(): void {
        [
            TRS,
            Node,
            TexturedCube
        ].forEach(ctor => {
            this.add<Component>(ctor);
            
        });
    }
}