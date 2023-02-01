import { Vec4 } from "../Vector.js";
import DrawObject from "./DrawObject.js";
export default class CameraCube extends DrawObject {
    constructor() {
        super();
        const positions = [
            new Vec4(-1, -1, -1, 1),
            new Vec4(1, -1, -1, 1),
            new Vec4(-1, 1, -1, 1),
            new Vec4(1, 1, -1, 1),
            new Vec4(-1, -1, 1, 1),
            new Vec4(1, -1, 1, 1),
            new Vec4(-1, 1, 1, 1),
            new Vec4(1, 1, 1, 1),
        ];
        const indices = [
            0, 1, 1, 3, 3, 2, 2, 0,
            4, 5, 5, 7, 7, 6, 6, 4,
            0, 4, 1, 5, 3, 7, 2, 6,
        ];
        this.setVertices(positions);
        this.setIndices(indices);
    }
    update() {
    }
}
//# sourceMappingURL=CameraCube.js.map