import { Vec4 } from "../Vector.js";
import DrawObject from "./DrawObject.js";
export default class Pointer extends DrawObject {
    constructor() {
        super();
        this.setVertices([new Vec4(0, 0, 0, 0)]);
        this.setIndices(new Array(1).fill(0).map((_, index) => index));
        this.setColors([new Vec4(1, 1, 1, 1)]);
    }
}
//# sourceMappingURL=Pointer.js.map