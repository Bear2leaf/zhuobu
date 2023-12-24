import Component from "./Component.js";
import Node from "../transform/Node.js";
import TRS from "../transform/TRS.js";
import Entity from "./Entity.js";
import DefaultSprite from "../sprite/DefaultSprite.js";
import MoveCircleController from "../controller/MoveCircleController.js";

export default class SpriteObject extends Entity {
    addDefaultComponents(): void {
        [
            TRS,
            Node,
            DefaultSprite,
            MoveCircleController
        ].forEach(ctor => {
            this.add<Component>(ctor);
            
        });
    }
}