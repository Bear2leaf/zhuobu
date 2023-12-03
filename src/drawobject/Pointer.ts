import DrawObject from "./DrawObject.js";
import { ArrayBufferIndex } from "../renderingcontext/RenderingContext.js";
import TouchEvent from "../event/TouchEvent.js";
import TRS from "../transform/TRS.js";
import { PrimitiveType } from "../contextobject/Primitive.js";

export default class Pointer extends DrawObject {
    init() {
        super.init();

        this.setPrimitive(this.getRenderingContext().makePrimitive(PrimitiveType.POINTS));

        this.createABO(ArrayBufferIndex.Position, new Float32Array([0, 0, 0, 1]), 4)
        this.createABO(ArrayBufferIndex.Color, new Float32Array([1, 1, 1, 1]), 4)
        this.updateEBO(new Uint16Array([0]))
    }
    update(): void {
        const touch = this.getEntity().get(TouchEvent);
        this.getEntity().get(TRS).getPosition().set(touch.getX(), touch.getY(), 0);
    }
}