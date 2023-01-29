import Matrix from "../Matrix.js";
import { Vec4 } from "../Vector.js";

export default class DrawObject {
    
    private readonly indices: number[];
    private readonly vertices: Vec4[];
    private readonly colors: Vec4[];
    private readonly worldMatrix: Matrix;
    constructor() {
        this.worldMatrix = Matrix.identity();
        this.vertices = [];
        this.colors = [];
        this.indices = [];
    }
    getWorldMatrix() {
        return this.worldMatrix;
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
    setWorldMatrix(matrix: Matrix) {
        this.worldMatrix.set(matrix);
    }
    setIndices(indices: number[]) {
        this.indices.splice(0, this.indices.length, ...indices)
    }
    setColors(colors: Vec4[]) {
        this.colors.splice(0, this.colors.length, ...colors)
    }
    update() {}
}