import Cube from "../geometry/Cube.js";
import { Vec4 } from "../math/Vector.js";
import DrawObject from "./DrawObject.js";

export default class ColorfulCube extends DrawObject {
    constructor() {
        const cube = new Cube();
        const triangles = cube.getTriangles();
        const points = cube.getPoints();
        const indices: number[] = [];
        const colors: Vec4[] = [];
        const vertices: Vec4[] = [];
        points.forEach((point) => {
            vertices.push(...point.vertices);
            colors.push(...point.colors);
        });
        triangles.forEach((triangle) => {
            indices.push(...triangle.indices);
        });
        super(colors, indices, vertices);
    }
}

