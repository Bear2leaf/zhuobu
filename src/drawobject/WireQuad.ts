import { Vec4, flatten } from "../geometry/Vector.js";
import DrawObject from "./DrawObject.js";
import { ArrayBufferIndex } from "../renderingcontext/RenderingContext.js";
import Quad from "../geometry/Quad.js";

export default class WireQuad extends DrawObject {
    private rect: Vec4 = new Vec4();
    init() {
        super.init();
        const quad = new Quad(0, 0, 1, 1);
        const colors: Vec4[] = [];
        const indices: number[] = [];
        const vertices: Vec4[] = [];
        quad.getLines().forEach(line => line.appendTo(vertices, colors))
        vertices.forEach((_, i) => indices.push(i));
        this.createABO(ArrayBufferIndex.Position, flatten(vertices), 4)
        this.createABO(ArrayBufferIndex.Color, flatten(colors), 4)
        this.updateEBO(new Uint16Array(indices));
    }
    updateRect(left: number, top: number, width: number, height: number) {
        this.rect.set(left, top, width, height)
    }
    update(): void {
        const quad: Quad = new Quad(this.rect.x, this.rect.y, this.rect.z, this.rect.w);
        const vertices: Vec4[] = [];
        quad.getLines().forEach(line => line.appendTo(vertices))
        this.updateABO(ArrayBufferIndex.Position, flatten(vertices))
    }
}

