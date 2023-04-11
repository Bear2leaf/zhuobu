import Cube from "../geometry/Cube.js";
import { Vec4, flatten } from "../math/Vector.js";
import ArrayBufferObject, { ArrayBufferIndex } from "./ArrayBufferObject.js";
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

        
        super(new Map<number, ArrayBufferObject>(), indices.length);
        this.aboMap.set(ArrayBufferIndex.Vertices, new ArrayBufferObject(ArrayBufferIndex.Vertices, flatten(vertices), new Uint16Array(indices)))
        this.aboMap.set(ArrayBufferIndex.Colors, new ArrayBufferObject(ArrayBufferIndex.Colors, flatten(colors), new Uint16Array(indices)))
        
    }
}

