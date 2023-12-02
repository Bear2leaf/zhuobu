import DrawObject from "./DrawObject.js";
import { ArrayBufferIndex } from "../renderingcontext/RenderingContext.js";
import TouchEventContainer from "../container/TouchEventContainer.js";
import TRS from "../transform/TRS.js";
import GLContainer from "../container/GLContainer.js";

export default class Pointer extends DrawObject {
    init() {
        super.init();


        this.createABO(ArrayBufferIndex.Position, new Float32Array([0, 0, 0, 1]), 4)
        this.createABO(ArrayBufferIndex.Color, new Float32Array([1, 1, 1, 1]), 4)
        this.updateEBO(new Uint16Array([0]))
    }
    getTouchEventContainer() {
        return this.getEntity().get(TouchEventContainer);
    }
    getTRS() {
        return this.getEntity().get(TRS);
    }

    private setPosition(x: number, y: number) {
        this.getTRS().getPosition().set(x, y, 0, 1);
    }
    draw(): void {
        this.setPosition(this.getTouchEventContainer().getX(), this.getTouchEventContainer().getY());
        this.bind();
        this.updateABO(ArrayBufferIndex.Position, this.getTRS().getPosition().toFloatArray());
        this.getRenderingContext().switchDepthTest(false);
        super.draw();
        this.getRenderingContext().switchDepthTest(true);
    }
}