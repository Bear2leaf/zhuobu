import Quad from "../geometry/Quad.js";
import { flatten, Vec4 } from "../geometry/Vector.js";
import DrawObject from "./DrawObject.js";
import { ArrayBufferIndex } from "../renderingcontext/RenderingContext.js";
import TRS from "../transform/TRS.js";

export default class Histogram extends DrawObject {
    private readonly quads: Quad[] = [];
    private readonly colors: Vec4[] = [];
    private readonly indices: number[] = [];
    private readonly vertices: Vec4[] = [];
    init() {
        super.init();
        const width = 100;
        const height = 100;
        const hisY = 0;
        const lines = 100;
        this.createABO(ArrayBufferIndex.Position, new Float32Array(0), 4)
        this.createABO(ArrayBufferIndex.Color, new Float32Array(0), 4)
        this.updateEBO(new Uint16Array(0));
        for (let i = 0; i < lines; i++) {
            const lineQuad = new Quad(i * width / lines, hisY, width / lines, 0, new Vec4(0, 1, 0, 1), i * 4);
            this.quads.push(lineQuad);
        }
        const background = new Quad(0, hisY, width, height, new Vec4(1, 1, 1, 1), this.quads.length * 4);
        this.quads.push(background);
        this.quads.forEach((quad) => quad.appendTo(this.vertices, this.colors, this.indices));
        this.getEntity().get(TRS).getPosition().set(200, 40, 0, 1);
    }
    updateHistogram(fps: number) {
        for (let index = this.quads.length - 2; index > 0; index--) {
            const quad = this.quads[index];
            const prevQuad = this.quads[index - 1];
            quad.copyHeight(prevQuad);
            prevQuad.setHeight(fps);
        }
    }
    draw(): void {
        this.updateABO(ArrayBufferIndex.Position, flatten(this.vertices));
        this.updateABO(ArrayBufferIndex.Color, flatten(this.colors));
        this.updateEBO(new Uint16Array(this.indices));
        super.draw();
    }
}

