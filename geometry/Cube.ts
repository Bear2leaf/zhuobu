import { Vec4 } from "../math/Vector.js";

export enum PrimitiveType {
    LINES,
    TRIANGLES
}

export default class Cube {
    readonly indices: number[];
    readonly vertices: Vec4[];
    readonly colors: Vec4[];

    constructor(type: PrimitiveType = PrimitiveType.LINES) {
        this.vertices = [
              new Vec4(-1, -1, -1, 1)  // cube vertices
            , new Vec4( 1, -1, -1, 1)
            , new Vec4(-1,  1, -1, 1)
            , new Vec4( 1,  1, -1, 1)
            , new Vec4(-1, -1,  1, 1)
            , new Vec4( 1, -1,  1, 1)
            , new Vec4(-1,  1,  1, 1)
            , new Vec4( 1,  1,  1, 1)
        ]
        if (type === PrimitiveType.LINES) {
            this.indices = [
                0, 1, 1, 3, 3, 2, 2, 0, // front
                4, 5, 5, 7, 7, 6, 6, 4, // back
                0, 4, 1, 5, 2, 6, 3, 7, // sides
            ];
            this.colors = [
                new Vec4(0, 0, 0, 1), // red
                new Vec4(0, 0, 0, 1), // green
                new Vec4(0, 0, 0, 1), // blue
                new Vec4(0, 0, 0, 1), // yellow
                new Vec4(0, 0, 0, 1), // magenta
                new Vec4(0, 0, 0, 1), // cyan
                new Vec4(0, 0, 0, 1), // white
                new Vec4(0, 0, 0, 1), // black
            ]
        } else {
            this.indices = [
                1, 0, 2, 2, 3, 1, // back
                5, 7, 6, 6, 4, 5, // front
                1, 3, 7, 7, 5, 1, // right
                0, 4, 6, 6, 2, 0, // left
                6, 7, 3, 3, 2, 6, // top
                4, 0, 1, 1, 5, 4, // bottom
            ];
            this.colors = [
                new Vec4(1, 0, 0, 1), // red
                new Vec4(0, 1, 0, 1), // green
                new Vec4(0, 0, 1, 1), // blue
                new Vec4(1, 1, 0, 1), // yellow
                new Vec4(1, 0, 1, 1), // magenta
                new Vec4(0, 1, 1, 1), // cyan
                new Vec4(1, 1, 1, 1), // white
                new Vec4(0, 0, 0, 1), // black
            ]
        }
    }

}

