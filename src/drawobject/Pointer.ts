import DrawObject from "./DrawObject.js";
import { ArrayBufferIndex } from "../renderingcontext/RenderingContext.js";
import TouchEventContainer from "../component/TouchEventContainer.js";
import TRS from "../component/TRS.js";

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
        this.getTRS().getPosition().set(x, y, 1, 1);
    }
    draw(mode: number): void {
        this.setPosition(this.getTouchEventContainer().getX(), this.getTouchEventContainer().getY());
        this.bind();
        this.updateABO(ArrayBufferIndex.Position, this.getTRS().getPosition().toFloatArray());
        super.draw(mode);
    }
}