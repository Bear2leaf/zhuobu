import DrawObject from "./DrawObject.js";
import { ArrayBufferIndex } from "../renderingcontext/RenderingContext.js";
import Entity from "../entity/Entity.js";
import TouchEventContainer from "../component/TouchEventContainer.js";

export default class Pointer extends DrawObject {
    private x: number = 0;
    private y: number = 0;
    private touchEventContainer: TouchEventContainer;
    constructor() {
        super();
        this.touchEventContainer = this.getEntity().get(TouchEventContainer);

        this.createABO(ArrayBufferIndex.Position, new Float32Array([0, 0, 0, 1]), 4)
        this.createABO(ArrayBufferIndex.Color, new Float32Array([1, 1, 1, 1]), 4)
        this.updateEBO(new Uint16Array([0]))
    }

    private setPosition( x: number, y: number) {
        this.x = x;
        this.y = y;

    }
    update(): void {
        this.setPosition(this.touchEventContainer.getX(), this.touchEventContainer.getY());
        
        this.bind();
        this.updateABO(ArrayBufferIndex.Position, new Float32Array([this.x, this.y, 0, 1]));
    }
    draw(mode: number): void {
        this.bind();
        super.draw(mode);
    }
}