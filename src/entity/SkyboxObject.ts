import { Component } from "./Entity.js";
import Node from "../transform/Node.js";
import TRS from "../transform/TRS.js";
import Entity from "./Entity.js";
import Skybox from "../drawobject/Skybox.js";

export default class SkyboxObject extends Entity {
    addDefaultComponents(): void {
        [
            TRS,
            Node,
            Skybox
        ].forEach(ctor => {
            this.add<Component>(ctor);
            
        });
    }
}