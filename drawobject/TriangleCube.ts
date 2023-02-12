import { Vec4 } from "../Vector.js";
import DrawObject from "./DrawObject.js";

export default class TriangleCube extends DrawObject {
    constructor() {
        super();
        const positions = [
            new Vec4(-1, -1, -1, 1),  // cube vertices
            new Vec4( 1, -1, -1, 1),
            new Vec4(-1,  1, -1, 1),
            new Vec4( 1,  1, -1, 1),
            new Vec4(-1, -1,  1, 1),
            new Vec4( 1, -1,  1, 1),
            new Vec4(-1,  1,  1, 1),
            new Vec4( 1,  1,  1, 1),
        ];
        const colors = [
            new Vec4(1, 0, 0, 1),  // cube vertices
            new Vec4(0, 1, 0, 1),
            new Vec4(0, 0, 1, 1),
            new Vec4(0, 1, 1, 1),
            new Vec4(1, 0, 1, 1),
            new Vec4(1, 1, 0, 1),
            new Vec4(1, 1, 1, 1),
            new Vec4(0, 0, 0, 1),
        ];
        const indices = [
            1, 0, 2, 2, 3, 1, // back
            5, 7, 6, 6, 4, 5, // front
            1, 3, 7, 7, 5, 1, // right
            0, 4, 6, 6, 2, 0, // left
            6, 7, 3, 3, 2, 6, // top
            4, 0, 1, 1, 5, 4, // bottom
        ];
        this.setVertices(positions)
        this.setIndices(indices)
        this.setColors(colors)
    }
    update(): void {

    }
}