import { Vec4 } from "../Vector";

export default class DrawObject {
    
    private readonly indices: number[];
    private readonly vertices: Vec4[];
    private readonly colors: Vec4[];
    constructor() {

        this.vertices = [];
        this.colors = [];
        this.indices = [];
    }
    getVertices() {
        return this.vertices;
    }
    getIndices() {
        return this.indices;
    }
    getColors() {
        return this.colors;
    }
    setVertices(vertices: Vec4[]) {
        this.vertices.splice(0, this.vertices.length, ...vertices)
    }
    setIndices(indices: number[]) {
        this.indices.splice(0, this.indices.length, ...indices)
    }
    setColors(colors: Vec4[]) {
        this.colors.splice(0, this.colors.length, ...colors)
    }
}