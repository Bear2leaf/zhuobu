export default class DrawObject {
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
    setVertices(vertices) {
        this.vertices.splice(0, this.vertices.length, ...vertices);
    }
    setIndices(indices) {
        this.indices.splice(0, this.indices.length, ...indices);
    }
    setColors(colors) {
        this.colors.splice(0, this.colors.length, ...colors);
    }
}
//# sourceMappingURL=DrawObject.js.map