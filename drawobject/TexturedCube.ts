import Cube from "../geometry/Cube.js";
import { Vec2, Vec4, flatten } from "../math/Vector.js";
import ArrayBufferObject, { ArrayBufferIndex } from "./ArrayBufferObject.js";
import DrawObject from "./DrawObject.js";

export default class TexturedCube extends DrawObject {

    constructor() {
        const cube = new Cube();
        const triangles = cube.getTriangles();
        const points = cube.getPoints();
        const indices: number[] = [];
        const colors: Vec4[] = [new Vec4(1, 1, 1, 1)];
        const vertices: Vec4[] = [];
        const textureCoords: Vec4[] = [];

        points.forEach((point) => {
            vertices.push(...point.vertices);
            colors.push(...point.colors);
        });
        triangles.forEach((triangle) => {
            indices.push(...triangle.indices);
        });
        for (let i = 0; i < 2; i++) {
            textureCoords.push(new Vec2(0, 1));
            textureCoords.push(new Vec2(1, 1));
            textureCoords.push(new Vec2(0, 0));
            textureCoords.push(new Vec2(1, 0));
        }


        super(new Map<number, ArrayBufferObject>(), indices.length);
        this.aboMap.set(ArrayBufferIndex.Vertices, new ArrayBufferObject(ArrayBufferIndex.Vertices, flatten(vertices)))
        this.aboMap.set(ArrayBufferIndex.Colors, new ArrayBufferObject(ArrayBufferIndex.Colors, flatten(colors)))
        this.aboMap.set(ArrayBufferIndex.TextureCoords, new ArrayBufferObject(ArrayBufferIndex.TextureCoords, flatten(textureCoords)))
        this.updateEBO(new Uint16Array(indices))
    }
    draw(mode: number): void {
        super.draw(mode);
    }
}

