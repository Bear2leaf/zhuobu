import { device } from "../Device.js";
import Quad from "../geometry/Quad.js";
import { flatten, Vec4 } from "../math/Vector.js";
import { ArrayBufferIndex } from "./ArrayBufferIndex.js";
import DrawObject from "./DrawObject.js";

export default class Histogram extends DrawObject {
    private readonly quads: Quad[];
    constructor() {
        const width = 100;
        const height = 100;
        const hisY = 200;
        const lines = 100;

        const colors: Vec4[] = [];
        const indices: number[] = [];
        const vertices: Vec4[] = [];
        super(colors, indices, vertices);
        this.quads = [];
        const background = new Quad(0, hisY, width, height);
        this.quads.push(background);
        for (let i = 0; i < lines; i++) {
            const line = new Quad(i * width / lines, hisY, width / lines, 0);
            line.indices.forEach((index, ii, indices) => {
                indices[ii] = (index + i * 4 + 4);
            });
            line.colors.fill(new Vec4(0, 1, 0, 1));
            this.quads.push(line);
        }
        this.quads.forEach((quad) => {
            quad.colors.forEach((color) => {
                colors.push(color);
            });
            quad.indices.forEach((index) => {
                indices.push(index);
            });
            quad.vertices.forEach((vertex) => {
                vertices.push(vertex);
            });
        });
    }
    updateHistogram(fps: number) {
        for (let index = 2; index < this.quads.length; index++) {
            const quad = this.quads[this.quads.length - index + 1];
            const prevQuad = this.quads[this.quads.length - index];
            quad.setHeight(prevQuad.vertices[1].y - prevQuad.vertices[0].y);
            prevQuad.setHeight(fps);
        }
    }
    draw(mode: number): void {

        this.arrayBufferObjects[ArrayBufferIndex.Vertices].updateArrayBuffer(flatten(this.vertices));
        this.arrayBufferObjects[ArrayBufferIndex.Colors].updateArrayBuffer(flatten(this.colors));
        this.arrayBufferObjects[ArrayBufferIndex.Vertices].updateIndices(new Uint16Array(this.indices));
        this.arrayBufferObjects[ArrayBufferIndex.Colors].updateIndices(new Uint16Array(this.indices));
        super.draw(mode);
    }
}

