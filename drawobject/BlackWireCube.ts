import Cube from "../geometry/Cube.js";
import { Vec4 } from "../math/Vector.js";
import DrawObject from "./DrawObject.js";

export default class BlackWireCube extends DrawObject {
    constructor() {
        const cube = new Cube();
        const lines = cube.getLines();
        const points = cube.getPoints();
        const colors: Vec4[] = [];
        const indices: number[] = [];
        const vertices: Vec4[] = [];
        lines.forEach((line) => {
            indices.push(...line.indices);
        });
        points.forEach((point) => {
            vertices.push(...point.vertices);
            point.colors[0].set(0, 0, 0, 1);
            colors.push(...point.colors);
        });

        super(colors, indices, vertices);
    }
}

