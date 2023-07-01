import Quad from "../math/Quad.js";
import { flatten, Vec4 } from "../math/Vector.js";
import DrawObject from "./DrawObject.js";
import { ArrayBufferIndex } from "../renderingcontext/RenderingContext.js";

export default class Histogram extends DrawObject {
    private readonly quads: Quad[] = [];
    private readonly colors: Vec4[] = [];
    private readonly indices: number[] = [];
    private readonly vertices: Vec4[] = [];
    init() {
        const width = 100;
        const height = 100;
        const hisY = 30;
        const lines = 100;

        this.createABO(ArrayBufferIndex.Position, new Float32Array(0), 4)
        this.createABO(ArrayBufferIndex.Color, new Float32Array(0), 4)
        this.updateEBO(new Uint16Array(0));
        const background = new Quad(0, hisY, width, height);
        this.quads.push(background);
        for (let i = 0; i < lines; i++) {
            const lineQuad = new Quad(i * width / lines, hisY, width / lines, 0, new Vec4(0, 1, 0, 1), i * 4 + 4);
            this.quads.push(lineQuad);
        }
        this.quads.forEach((quad) => quad.appendTo(this.vertices, this.colors, this.indices));
    }
    updateHistogram(fps: number) {
        for (let index = 2; index < this.quads.length; index++) {
            const quad = this.quads[this.quads.length - index + 1];
            const prevQuad = this.quads[this.quads.length - index];
            quad.copyHeight(prevQuad);
            prevQuad.setHeight(fps);
        }
    }
    draw(mode: number): void {
        this.bind()
        this.updateABO(ArrayBufferIndex.Position, flatten(this.vertices));
        this.updateABO(ArrayBufferIndex.Color, flatten(this.colors));
        this.updateEBO(new Uint16Array(this.indices));
        super.draw(mode);
    }
}

