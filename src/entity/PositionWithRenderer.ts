import Primitive from "../contextobject/Primitive.js";
import SpriteRenderer from "../renderer/SpriteRenderer.js";
import Shader from "../shader/Shader.js";
import Entity from "./Entity.js";

export default class PositionWithRenderer extends Entity {
    constructor(shader: Shader, primitive: Primitive) {
        super()
        this.addComponent(new Node());
        this.addComponent(new SpriteRenderer(shader, primitive));
    }
}