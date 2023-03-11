import Cone from "../geometry/Cone.js";
import { Vec4 } from "../math/Vector.js";
import DrawObject from "./DrawObject.js";

export default class BlackWireCone extends DrawObject {
    constructor() {
        const cone = new Cone();
        const lines = cone.getLines();
        const points = cone.getPoints();
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

