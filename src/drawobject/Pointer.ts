import DrawObject from "./DrawObject.js";
import { ArrayBufferIndex } from "../renderingcontext/RenderingContext.js";
import { PrimitiveType } from "../contextobject/Primitive.js";
import Node from "../transform/Node.js";
import TRS from "../transform/TRS.js";

export default class Pointer extends DrawObject {
    initContextObjects() {
        super.initContextObjects();

        this.setPrimitive(this.getRenderingContext().makePrimitive(PrimitiveType.POINTS));

        this.createABO(ArrayBufferIndex.Position, new Float32Array([0, 0, 0, 1]), 4)
        this.createABO(ArrayBufferIndex.Color, new Float32Array([1, 1, 1, 1]), 4)
        this.updateEBO(new Uint16Array([0]))
    }
    onClick(x: number, y: number) {
        this.getEntity().get(TRS).getPosition().x = x;
        this.getEntity().get(TRS).getPosition().y = y;
    }
    update(): void {
        this.getEntity().get(Node).updateWorldMatrix();
    }
}