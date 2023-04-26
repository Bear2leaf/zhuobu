import Quad from "../geometry/Quad.js";
import { flatten, Vec4 } from "../math/Vector.js";
import Node from "../structure/Node.js";
import ArrayBufferObject, { ArrayBufferIndex } from "./ArrayBufferObject.js";
import DrawObject from "./DrawObject.js";

export default class Histogram extends DrawObject {
    private readonly quads: Quad[];
    private readonly colors: Vec4[] = [];
    private readonly indices: number[] = [];
    private readonly vertices: Vec4[] = [];
    constructor() {
        const width = 100;
        const height = 100;
        const hisY = 200;
        const lines = 100;
        super(new Node(), new Map<number, ArrayBufferObject>(), 0);

        this.createABO(ArrayBufferIndex.Vertices, new Float32Array(0), 4)
        this.createABO(ArrayBufferIndex.Colors, new Float32Array(0), 4)
        this.updateEBO(new Uint16Array(0));
        this.quads = [];
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

        this.updateABO(ArrayBufferIndex.Vertices, flatten(this.vertices));
        this.updateABO(ArrayBufferIndex.Colors, flatten(this.colors));
        this.updateEBO(new Uint16Array(this.indices));
        this.setCount(this.indices.length);
        
        super.draw(mode);
    }
}

