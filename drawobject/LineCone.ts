import { Vec4 } from "../Vector.js";
import DrawObject from "./DrawObject.js";

export default class LineCone extends DrawObject {
    constructor() {
        super();
        const positions = [
            new Vec4(  0,  0,   1, 1), // tip
            new Vec4(  1,  1,  -1, 1),  // tr
            new Vec4(  1, -1,  -1, 1),  // br
            new Vec4( -1, -1,  -1, 1),  // bl
            new Vec4( -1,  1,  -1, 1),  // tl
        ];
        const indices = [
            0, 1, 0, 2, 0, 3, 0, 4, // cube indices
            1, 2, 2, 3, 3, 4, 4, 1,
        ];
        this.setVertices(positions)
        this.setIndices(indices)
    }
    update(): void {

    }
}