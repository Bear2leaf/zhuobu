import DrawObject from "./DrawObject.js";
import { ArrayBufferIndex } from "../renderingcontext/RenderingContext.js";
import Entity from "../entity/Entity.js";
import TouchEventContainer from "../component/TouchEventContainer.js";

export default class Pointer extends DrawObject {
    private x: number = 0;
    private y: number = 0;
    constructor(entity: Entity) {
        super(entity);
        entity.getComponent(TouchEventContainer).getOnTouchStart()((e: { x: number, y: number }) => this.setPosition(e))
        entity.getComponent(TouchEventContainer).getOnTouchMove()((e: { x: number, y: number } | undefined) => this.setPosition(e))
        entity.getComponent(TouchEventContainer).getOnTouchEnd()(() => { })
        entity.getComponent(TouchEventContainer).getOnTouchCancel()(() => { })

        this.createABO(ArrayBufferIndex.Position, new Float32Array([0, 0, 0, 1]), 4)
        this.createABO(ArrayBufferIndex.Color, new Float32Array([1, 1, 1, 1]), 4)
        this.updateEBO(new Uint16Array([0]))
    }

    private setPosition(e: { x: number, y: number } | undefined) {
        if (!e) {
            throw new Error("event not exist")
        }
        this.x = e.x;
        this.y = e.y;

    }
    update(): void {
        this.bind();
        this.updateABO(ArrayBufferIndex.Position, new Float32Array([this.x, this.y, 0, 1]));
    }
    draw(mode: number): void {
        this.bind();
        super.draw(mode);
    }
}