
import Node from "../component/Node.js";
import { PrimitiveType } from "../contextobject/Primitive.js";
import DrawObject from "../drawobject/DrawObject.js";
import RenderingContext from "../renderingcontext/RenderingContext.js";
import Renderer from "./Renderer.js";

export default class SpriteRenderer extends Renderer {
    render(): void {

        super.render();
        this.getEntity().get(DrawObject).draw(this.getPrimitive().getMode());
    }
    initPrimitive(gl: RenderingContext): void {
        this.setPrimitive(gl.makePrimitive(PrimitiveType.TRIANGLES));
    }
    update(): void {
        this.getEntity().get(Node).updateWorldMatrix();
    }
}