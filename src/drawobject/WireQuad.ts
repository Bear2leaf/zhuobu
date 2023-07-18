import { Vec4, flatten } from "../math/Vector.js";
import DrawObject from "./DrawObject.js";
import { ArrayBufferIndex } from "../renderingcontext/RenderingContext.js";
import Quad from "../math/Quad.js";

export default class WireQuad extends DrawObject {
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
        console.log(this, vertices, colors, indices)
    }
    update(): void {

    }
    draw(mode: number): void {
        this.bind()
        super.draw(mode);
    }
}

