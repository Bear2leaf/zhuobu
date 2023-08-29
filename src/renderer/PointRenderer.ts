import { PrimitiveType } from "../contextobject/Primitive.js";
import DrawObject from "../drawobject/DrawObject.js";
import RenderingContext from "../contextobject/RenderingContext.js";
import Renderer from "./Renderer.js"
export class PointRenderer extends Renderer {
    render(): void {
        super.render();
        this.getEntity().get(DrawObject).draw(this.getPrimitive().getMode());
    }
    initPrimitive(rc: RenderingContext): void {
        this.setPrimitive(rc.makePrimitive(PrimitiveType.POINTS));
    }
}