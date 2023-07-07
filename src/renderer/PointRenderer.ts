import PrimitiveContainer from "../component/PrimitiveTypeContainer.js";
import DrawObject from "../drawobject/DrawObject.js";
import Renderer from "./Renderer.js"
export class PointRenderer extends Renderer {
    render(): void {
        super.render();
        const primitive = this.getEntity().get(PrimitiveContainer).getPrimitive();
        this.getEntity().get(DrawObject).draw(primitive.getMode());
    }
}