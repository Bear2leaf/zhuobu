import { device } from "../Device.js";
import Quad from "../geometry/Quad.js";
import { flatten, Vec4 } from "../math/Vector.js";
import { ArrayBufferIndex } from "./ArrayBufferIndex.js";
import DrawObject from "./DrawObject.js";

export default class Histogram extends DrawObject {
    private readonly quads: Quad[];
    readonly colors: Vec4[] = [];
    readonly indices: number[] = [];
    readonly vertices: Vec4[] = [];
    constructor() {
        const width = 100;
        const height = 100;
        const hisY = 200;
        const lines = 100;

        super([], [], []);

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
                this.colors.push(color);
            });
            quad.indices.forEach((index) => {
                this.indices.push(index);
            });
            quad.vertices.forEach((vertex) => {
                this.vertices.push(vertex);
            });
        });
        console.log(this)
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

        this.aboMap.get(ArrayBufferIndex.Vertices)!.update(flatten(this.vertices), new Uint16Array(this.indices));
        this.aboMap.get(ArrayBufferIndex.Colors)!.update(flatten(this.colors), new Uint16Array(this.indices));
        this.count = this.indices.length;
        
        super.draw(mode);
    }
}

