import Matrix from "../Matrix.js";
export default class DrawObject {
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
    setVertices(vertices) {
        this.vertices.splice(0, this.vertices.length, ...vertices);
    }
    setWorldMatrix(matrix) {
        this.worldMatrix.set(matrix);
    }
    setIndices(indices) {
        this.indices.splice(0, this.indices.length, ...indices);
    }
    setColors(colors) {
        this.colors.splice(0, this.colors.length, ...colors);
    }
    update() { }
}
//# sourceMappingURL=DrawObject.js.map